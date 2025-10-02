var express = require('express');
var path = require('path');
var mysql = require('mysql2');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');


const cookieParser = require('cookie-parser');
const saltRounds = 10;
require('dotenv').config();
var {Sequelize, Op} = require('sequelize');
const {Services, DescriptionItem, Feedback, Type, WorkDate, WorkTime, sequelize} = require('./dbSeqiulize');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//Create DB
// app.get('/createDB', function  (req, res) {
//     sequelize.sync()
//     .then(() => {
//         console.log("Connection to DB was successful");
//     })
//     .catch(err => {
//         console.error("Unable to connect to DB", err);
//     });
  
// });

// app.get("/.netlify/functions/api", (_req, res ) => {
//     res.status(200).json(
//      {mes: "Hello World!",
//         host: process.env.MYSQL_HOST,
//         ADMIN_PASSWOR: process.env.MYSQL_ADMIN_PASSWORD,
//         MYSQL_ADMIN: process.env.MYSQL_ADMIN,
//         MYSQL_DATABASE: process.env.MYSQL_DATABASE
//      }
//    )
//  });

app.get('/workTime/:date', asyncHandler( async (req, res) => {
    const result = await WorkTime.findAll({
        include: [{
            model: WorkDate,
            attributes: [],
            as: 'date',
            where:{
                date: {
                    [Op.eq]: new Date(req.params.date), 
                }
            },
        }],
        attributes: {
            include:[[Sequelize.fn('date_format',  Sequelize.col('time'), '%H:%i'), 'time']],
            exclude: ['workDateId'] 
        },
    });
    res.json(result);
}));


app.get('/workDate', asyncHandler( async (req, res) => {
    const result = await WorkDate.findAll({
        attributes:
[[Sequelize.fn('date_format',  Sequelize.col('date'), '%Y-%m-%d'), 'date']],
        
        where:{
            date: {
                [Op.gte]: new Date(),
            }
        }
    });
     res.json(result);
}));

app.get('/workDateByMonth/:date', asyncHandler( async (req, res) => {
    const resDate = new Date(req.params.date);
    const month = resDate.getMonth() + 1;
    const year = resDate.getFullYear();
    const result = await WorkDate.findAll({
        where: {
            date:{
                [Op.and]: {
                   [Op.gte]: resDate,
                   [Op.lte]: new Date(year, month, 0, 23, 59)
        },                
            }
    },
    });
    res.json(result);
}));


app.get('/feedback',  asyncHandler( async (req, res) => {
  let result = await Feedback.findAll();
  res.status(200).json(result);
}));

app.get('/services', asyncHandler( async (req, res) => {
    let types = '';
    let services = '';
    let descriptionItem = '';
    types = await Type.findOne({
        attributes: {
            exclude: ['id'] 
        },
    });
    let servicesWithType = await Services.findAll({
        include: [{
            model: DescriptionItem,
            as: 'serviceDesc',
        },
        {
            model: Type,
            attributes: [],
            as: 'servicesType',
        }],
        // attributes: {
        //     exclude: ['id'] 
        // },
        where: {
            typeId:{
                [Op.ne]: null                
            }
    },
    });
    let servicesWithoutType = await Services.findAll({
        include: [{
            model: DescriptionItem,
            as: 'serviceDesc',
        },
        {
            model: Type,
            attributes: [],
            as: 'servicesType',
        }],
        // attributes: {
        //     exclude: ['id'] 
        // },
        
        where: {
            typeId:{
                [Op.eq]: null                
            }
    },
    });

    let fullData = [{services: servicesWithoutType }, {name: types.name, services: servicesWithType }];
    res.json(fullData);

        res.json(services);
}));
let tryCounter = 0;
app.post('/login', function  (req, res) {
    tryCounter++;
    if(tryCounter > 10) res.sendStatus(403);
    const userName = req.body.login;
    const userPass = req.body.password;
    var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(`${userPass}`, salt);
  let result = bcrypt.compareSync(`${process.env.ADMIN_PASS}`, hash);
  if (userName !== process.env.ADMIN_LOGIN) {
    return res.status(401).json({ message: "Неверный логин!" });
  }
  if (!result) {
    return res.status(401).send({
      message: "Неверный пароль!",
    });
  }
  const token = jwt.sign({ adminName: process.env.ADMIN_LOGIN },
    `${process.env.SECRET}`,
    {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: 86400, // 24 hours
    });

  const options = {
    httpOnly: true,
};
tryCounter = 0;
res.cookie('accessToken', token, options);
res.sendStatus(200);
});



app.get('/logout', function  (req, res) {
  res.clearCookie("accessToken");
  res.json(req.cookies);
});

app.get('/auth', function  (req, res) {
    const token = req.cookies.accessToken;
    console.log("token = " + token);
    try{
        var decoded = jwt.verify(token, process.env.SECRET);
        res.status(200).json({
            ct: token,
            decoded: decoded
        });
    } catch(err){
        res.sendStatus(403);
    }
});
//check auth,  doesn't work on netlify
// app.use((req, res, next) => {
//     const token = req.cookies.accessToken;
//     jwt.verify(token, process.env.SECRET,  function(err, decoded) {
//         if(err || decoded.adminName !== process.env.ADMIN_LOGIN) {
//             res.sendStatus(403);
//             // res.end;
//         } else {
//             next();    
//         }
        
//     });
// })

app.get('/addDate/:date.:time', asyncHandler( async (req, res) => {
    const [wd, created] = await WorkDate.findOrCreate({
        where: { date: new Date(req.params.date) },
    });

    const newTime = await WorkTime.create({
        time: req.params.time,
        workDateId: wd.id
    });
     res.status(200).json({newDate: created, id: newTime.id }); 

}));

app.get('/removeTime/:date.:timeId',  asyncHandler( async (req, res) => {
    let responseObject = {removeDate: false};
    await WorkTime.destroy({
        where: {
            id: req.params.timeId,
        },
    });
    
    const count = await WorkTime.count({
        include: [{
            model: WorkDate,
            attributes: [],
            as: 'date',
            where:{
                date: {
                    [Op.eq]: new Date(req.params.date), 
                }
            },
        }],
    });
    
    if(count === 0){
        await WorkDate.destroy({
            where: {
                date: new Date(req.params.date),
            },
        });
        responseObject.removeDate = true;
    }
    res.status(200).json(responseObject);
   
}));

app.post('/addFeedback',  asyncHandler( async (req, res) => {
  let result = await Feedback.create(req.body.newFeedback);
  res.status(200).json(result);
}));
app.post('/removeFeedback',  asyncHandler( async (req, res) => {
  let result = await Feedback.destroy({
      where: {
        id: req.body.id,
      },
    });
  res.status(200).json({isRemove: result});
}));

app.post('/updateFeedback',  asyncHandler( async (req, res) => {
    const feedback = req.body.newFeedback;
    let result = await Feedback.update(
        {   
            name: feedback.name,
            text: feedback.text
        },
        {
            where: {
                id: feedback.id,
            },
        },
    );
    res.status(200).json(result);
}));

app.post('/updateServiceDescCost',  asyncHandler( async (req, res) => {
    const serviceDesc = req.body.serviceDesc;
    let countUpdated = 0;

    serviceDesc.forEach(async (c) => {
        countUpdated++;
        await DescriptionItem.update(
        {   
            cost: c.cost,
            minCost: c.minCost,
            maxCost: c.maxCost,
        },
        {
            where: {
                id: c.id,
            },
        },
    );
    })

    res.sendStatus(200);
}));

app.post('/updateServiceCost',  asyncHandler( async (req, res) => {
    const services = req.body.services;
    let countUpdated = 0;

    services.forEach(async (c) => {
        countUpdated++;
        await Services.update(
        {   
            cost: c.cost,
            minCost: c.minCost,
            maxCost: c.maxCost,
        },
        {
            where: {
                id: c.id,
            },
        },
    );
    })

    res.sendStatus(200);
}));

app.get('/servicesCost', asyncHandler( async (req, res) => {
    let types = '';
    let services = '';
    let descriptionItem = '';
    types = await Type.findOne({
        attributes: {
            exclude: ['id'] 
        },
    });
    let servicesWithType = await Services.findAll({
        include: [{
            model: DescriptionItem,
            as: 'serviceDesc',
        },
        {
            model: Type,
            attributes: [],
            as: 'servicesType',
        }],
        attributes: {
            exclude: ['typeId','descTitle','descContent','descComment'] 
        },
        where: {
            typeId:{
                [Op.ne]: null                
            }
    },
    });
    let servicesWithoutType = await Services.findAll({
        include: [{
            model: DescriptionItem,
            as: 'serviceDesc',
        },
        {
            model: Type,
            attributes: [],
            as: 'servicesType',
        }],
        attributes: {
            exclude: ['typeId','descTitle','descContent','descComment'] 
        },
        where: {
            typeId:{
                [Op.eq]: null                
            }
    },
    });
    
    let fullData = [{services: servicesWithoutType }, {name: types.name, services: servicesWithType }];
    res.json(fullData);
}));

app.listen(3013)
// const handler = ServerlessHttp(app);

// module.exports.handler = async(event, context) =>{
//   const result = await handler(event, context)
//   return result;
// }
