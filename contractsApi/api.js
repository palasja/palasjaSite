require('dotenv').config();

var express = require('express');
var path = require('path');
const mysql = require('mysql2/promise');
var cors = require('cors');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const asyncHandler = require('express-async-handler');
const cookieParser = require('cookie-parser');
const saltRounds = 10;

var {Sequelize, Op, where} = require('sequelize');
const {sequelize, Organization, Contracts, Personal, Service, Users} = require('./dbSeqiulize');
const SECRET = '23sadf6rucvbnvza-sd[pqw,';
const cookieOption =  {
      httpOnly: true,
      path: '/',
      domain: '.palasja.by'
    };
const cookieRaadOption = {
      path: '/',
      domain: '.palasja.by'
}
var app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));
app.use(cors({
  origin: true,
  credentials: true
}));

const expire = {
  day: 86400000, // 24 hours
  month: 2592000000, // 30 days
  quarter: 7776000000, // 90 days
}
const getToken = (payload, expires) => {
  return jwt.sign(
    payload,
    `${SECRET}`,
    {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: expires,
    });
}
 mysql.createConnection({
        user : process.env.MYSQL_ADMIN,
      password : process.env.MYSQL_ADMIN_PASSWORD,
        // user     : "palasja",
        // password : "wania-0806"
    }).then((connection) => {
        connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};`).then(() => {
                sequelize.sync()
                    .then(() => {
                        console.log("Connection to DB was successful");
                        })
                    .catch(err => {
                        console.error("Unable to connect to DB", err);
                    });
        })
    })
const router = express.Router()

router.get('/test',  asyncHandler( async (req, res) => {

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'palasjaby_DB',
    database: 'palasjaby_contracts',
    port: 3306,
    password: `${process.env.MYSQL_ADMIN_PASSWORD}`,
});
  let result = await connection.execute(
    'SELECT * FROM organization'  );
  res.status(200).json(result);
    //  res.status(200).json({
    //      test:process.env.MYSQL_ADMIN, test1:process.env.MYSQL_ADMIN_PASSWORD});
}));

router.post('/signIn', asyncHandler( async (req, res) => {
  const admin = await Users.findAll();
  if(admin.length !== 0) {
    res.sendStatus(403); 
    return;
  } else {
  const userName = req.body.login;
  const userPass = req.body.password;
  var salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(`${userPass}`, salt);

  await Users.create( {
      login: userName,
      password: hash
    } );

    const expireDate =  Date.now() + expire.day;
    const newAccessToken = getToken({ expireIn: expireDate}, expire.day);
    const newRefreshToken = getToken({ expireIn:  Date.now() + expire.quarter}, expire.quarter);
    res.cookie('accessToken', newAccessToken, cookieOption);
    res.cookie('refreshToken', newRefreshToken, cookieOption);
    res.cookie('expireDate', expireDate, cookieRaadOption);
    res.sendStatus(200);
  }

  }));
router.post('/logIn', asyncHandler( async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const admin = await Users.findOne( );
  jwt.verify(accessToken, `${SECRET}`, (err, decoded) => {
    if(err){
      const userName = req.body.login;
      const userPass = req.body.password;

      if(admin == null) {
        res.sendStatus(403); 
      } else {
      const isPassCorrect = bcrypt.compareSync(userPass, admin.password);
      if(isPassCorrect && userName == admin.login){

          const expireDate =  Date.now() + expire.day;
          const newAccessToken = getToken({ expireIn: expireDate}, expire.day);
          const newRefreshToken = getToken({ expireIn:  Date.now() + expire.quarter}, expire.quarter);
          res.cookie('accessToken', newAccessToken, cookieOption);
          res.cookie('refreshToken', newRefreshToken, cookieOption);
          res.cookie('expireDate', expireDate, cookieRaadOption );
          res.sendStatus(200);
        } else {
          res.sendStatus(403); 
        }
      }
    } else {
      res.sendStatus(200);
    }
  });

}));
router.post('/checkAuth', asyncHandler( async (req, res) => {
  const accessToken = req.cookies.accessToken;
  jwt.verify(accessToken, `${SECRET}`, (err, decoded) => {
    if(err){
        res.sendStatus(403); 
    } else {
      res.sendStatus(200);
    }
  })
}));
router.get('/logout', function  (req, res) {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.clearCookie("expireDate");
  res.sendStatus(200);
});
router.use((req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if(accessToken){
    jwt.verify(accessToken, `${SECRET}`, (err, decoded) => {
      if (err && err.name == 'TokenExpiredError') {
        jwt.verify(refreshToken, SECRET, (err, decoded) => {
          if (err) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.clearCookie("expireDate");
             res.sendStatus(401);
             return;
          } else{
            const expireDate =  Date.now() + expire.day;
            const newAccessToken = getToken({ expireIn: expireDate}, expire.day);
            const newRefreshToken = getToken({ expireIn:  Date.now() + expire.quarter}, expire.quarter);
            res.cookie('accessToken', newAccessToken, cookieOption);
            res.cookie('refreshToken', newRefreshToken, cookieOption);
            res.cookie('expireDate', expireDate, cookieRaadOption );
            return next();
          }
        });
      } else {
          return next();
      }
      });
  } else {
    return res.sendStatus(401);
  }
})
router.get('/getOrganizations',  asyncHandler( async (req, res) => {
  let result = await Organization.findAll();
  res.status(200).json(result);
}));
router.put('/addOrganization',  asyncHandler( async (req, res) => {
  let result = await Organization.create({
    name: req.body.organization.name
  });
  res.status(200).json(result);
}));
router.delete('/removeOrganization',  asyncHandler( async (req, res) => {
  let result = await Organization.destroy({
      where: {
        id: req.body.id,
      },
    });
    const statusCode = result == true ? 200 : 400;
    res.status(statusCode).json(result);
}));
router.patch('/updateOrganization',  asyncHandler( async (req, res) => {
    const organization = req.body.organization;
    console.log('updateOrganization ' + organization.name);
    let result = await Organization.update(
        organization,
        {
            where: {
                id: organization.id,
            },
        },
    );
    res.status(200).json(result);
}));
router.get('/getContractsByOrg/:id',  asyncHandler( async (req, res) => {
  let result = await Contracts.findAll({
    attributes: {
      exclude: ['scan'] 
    },
    where: {
      orgId: req.params.id,
    },
    });
  res.status(200).json(result);
}));
router.get('/getContractByOrgIdMonth/:orgId/:month', asyncHandler( async (req, res) => {
  const month = Number(req.params.month);
  const orgId = req.params.orgId;
  const firstWorkDayDate  = new Date(2025, month);
  const lastWorkDayDate = new Date(2025, month+1, 0, 23, 59 );
  
  let result = await Contracts.findOne({
        attributes: {
      exclude: ['scan'] 
    },
      where: {
        orgId: orgId,
        [Op.and]:[
{          [Op.or]:[
          Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('startDate')), month+1),
          {startDate: {
            [Op.lte]: firstWorkDayDate
          }},
          ]},

          {endDate: {
            [Op.gte]: lastWorkDayDate
          }}
        ]
      },
    });
    res.status(200).json(result);
}));
router.put('/addContracts',  asyncHandler( async (req, res) => {
  let result = await Contracts.create(req.body.contract);
  res.status(200).json(result);
}));
router.delete('/removeContract',  asyncHandler( async (req, res) => {
  let result = await Contracts.destroy({
      where: {
        id: req.body.id,
      },
    });
  const statusCode = result == true ? 200 : 400;
  res.status(statusCode).json(result);
}));
router.patch('/updateContract',  asyncHandler( async (req, res) => {
    const contract = req.body.contract;
    let result = await Contracts.update(
        contract,
        {
            where: {
                id: contract.id,
            },
        },
    );
    res.status(200).json(result);
}));
router.get('/getPersonalByOrgId/:id',  asyncHandler( async (req, res) => {
  let result = await Personal.findAll({
      where: {
        orgId: req.params.id,
      },
    });
  res.status(200).json(result);
}));
router.put('/addPersonal',  asyncHandler( async (req, res) => {
  let result = await Personal.create(req.body.personal);
  res.status(200).json(result);
}));
router.delete('/removePersonal',  asyncHandler( async (req, res) => {
  let result = await Personal.destroy({
      where: {
        id: req.body.id,
      },
    });
  res.status(200).json({isRemove: result});
}));
router.patch('/updatePersonal',  asyncHandler( async (req, res) => {
    const personal = req.body.personal;
    let result = await Personal.update(
        personal,
        {
            where: {
                id: personal.id,
            },
        },
    );
    res.status(200).json(result);
}));
router.get('/getServicesByOrgId/:id',  asyncHandler( async (req, res) => {
  let result = await Service.findAll({
      where: {
        orgId: req.params.id,
      },
    });
  res.status(200).json(result);
}));
router.get('/getServicesByOrgIdMonth/:orgId/:month', asyncHandler( async (req, res) => {
  const month = Number(req.params.month);
  const orgId = req.params.orgId === 'null'? null : req.params.orgId;
  const firstWorkDayDate  = new Date(2025, month);
  const lastWorkDayDate = new Date(2025, month+1, 0, 23, 59 );
  
   let result = await Service.findAll({
  where: {
    orgId: orgId,
      [Op.and]:[
        {date: {
          [Op.gte]: firstWorkDayDate
        }},
        {date: {
          [Op.lte]: lastWorkDayDate
        }}
      ]
    },
  });
    res.status(200).json(result);
}));
router.get('/getServicesByMonth/:month', asyncHandler( async (req, res) => {
  const month = Number(req.params.month);
  const firstWorkDayDate  = new Date(2025, month);
  const lastWorkDayDate = new Date(2025, month+1, 0, 23, 59 );
  
   let result = await Service.findAll({
  where: {
      [Op.and]:[
        {date: {
          [Op.gte]: firstWorkDayDate
        }},
        {date: {
          [Op.lte]: lastWorkDayDate
        }}
      ]
    },
  });
    res.status(200).json(result);
}));
router.get('/test/:startDate&:endDate', asyncHandler( async (req, res) => {
  const startDate =req.params.startDate;
  const endDate = req.params.endDate;
  res.status(200).json({startDate, endDate});
  // const orgId = req.params.orgId;
  // const firstWorkDayDate  = new Date(2025, month);
  // const lastWorkDayDate = new Date(2025, month+1, 0, 23, 59 );
  
  //  let result = await Service.findAll({
  // where: {
  //   orgId: orgId,
  //     [Op.and]:[
  //       {date: {
  //         [Op.gte]: firstWorkDayDate
  //       }},
  //       {date: {
  //         [Op.lte]: lastWorkDayDate
  //       }}
  //     ]
  //   },
  // });
  //   res.status(200).json(result);
}));
router.put('/addService',  asyncHandler( async (req, res) => {
  let result = await Service.create(req.body.service);
  res.status(200).json(result);
}));
router.delete('/removeService',  asyncHandler( async (req, res) => {
  let result = await Service.destroy({
      where: {
        id: req.body.id,
      },
    });
  res.status(200).json({isRemove: result});
}));
router.patch('/updateService',  asyncHandler( async (req, res) => {
    const service = req.body.service;
    let result = await Service.update(
        service,
        {
            where: {
                id: service.id,
            },
        },
    );
    res.status(200).json(result);
}));
router.get('/contractScan/:id',  asyncHandler( async (req, res) => {
  let result = await Contracts.findOne({
      attributes: ['scan'],
      where: {
        id: req.params.id,
      },
    });
  res.status(200).json(result);
}));
// path as /api/service
app.use('/api', router);

app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3000);
})
