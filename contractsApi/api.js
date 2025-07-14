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

var app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "200mb" }));
app.use(cors({
  origin: true,
  credentials: true
}));

const expire = {
  day: 86400, // 24 hours
  month: 2592000, // 30 days
  quarter: 7776000, // 90 days
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

router.get('/test', function  (req, res) {
     res.status(200).json({test:'123'});
});
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

    const options = {
      httpOnly: true,
    };

    const newAccessToken = getToken({ expireIn: Date.now() + expire.day}, expire.day);
    const newRefreshToken = getToken({ expireIn:  Date.now() + expire.quarter}, expire.quarter);
    res.cookie('accessToken', newAccessToken, options);
    res.cookie('refreshToken', newRefreshToken, options);
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
          const options = {
            httpOnly: true,
            path: '/'
          };
          const newAccessToken = getToken({ expireIn: Date.now() + expire.day}, expire.day);
          const newRefreshToken = getToken({ expireIn:  Date.now() + expire.quarter}, expire.quarter);
          res.cookie('accessToken', newAccessToken, options);
          res.cookie('refreshToken', newRefreshToken, options);
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
             res.sendStatus(401);
             return;
          } else{
            const options = {
              httpOnly: true,
            };
            const newAccessToken = getToken({ expireIn: Date.now() + expire.day}, expire.day);
            const newRefreshToken = getToken({ expireIn:  Date.now() + expire.quarter}, expire.quarter);
            res.cookie('accessToken', newAccessToken, options);
            res.cookie('refreshToken', newRefreshToken, options);
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
  const orgId = req.params.orgId;
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
// app.get('/getActInfo/:orgId/:month',  asyncHandler( async (req, res) => {
//   const month = Number(req.params.month);
//   const firstWorkDayDate  = new Date(2025, month);
//   const lastWorkDayDate = new Date(2025, month+1, 0, 23, 59 )
//   let contract = await Contracts.findOne({
//       where: {
//         orgId: req.params.orgId,
//         [Op.and]:[
//           // Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('startDate')), month+1),
//           {startDate: {
//             [Op.lte]: firstWorkDayDate
//           }},
//           {endDate: {
//             [Op.gte]: lastWorkDayDate
//           }}
//         ]
//       },
//     });
//   let services = await Service.findAll({
//   where: {
//     orgId: req.params.orgId,
//       [Op.and]:[
//         {date: {
//           [Op.gte]: firstWorkDayDate
//         }},
//         {date: {
//           [Op.lte]: lastWorkDayDate
//         }}
//       ]
//     },
//   });
//     let persons = await Personal.findAll({
//       where: {
//         orgId: req.params.orgId,
//       },
//     });
//   res.status(200).json({contract: contract, services: services, persons:persons});
// }));

// app.get('/workTime/:date', asyncHandler( async (req, res) => {
//     const result = await WorkTime.findAll({
//         include: [{
//             model: WorkDate,
//             attributes: [],
//             as: 'date',
//             where:{
//                 date: {
//                     [Op.eq]: new Date(req.params.date), 
//                 }
//             },
//         }],
//         attributes: {
//             include:[[Sequelize.fn('date_format',  Sequelize.col('time'), '%H:%i'), 'time']],
//             exclude: ['workDateId'] 
//         },
//     });
//     res.json(result);
// }));


// app.get('/workDate', asyncHandler( async (req, res) => {
//     const result = await WorkDate.findAll({
//         attributes:
// [[Sequelize.fn('date_format',  Sequelize.col('date'), '%Y-%m-%d'), 'date']],
        
//         where:{
//             date: {
//                 [Op.gte]: new Date(),
//             }
//         }
//     });
//      res.json(result);
// }));

// app.get('/workDateByMonth/:date', asyncHandler( async (req, res) => {
//     const resDate = new Date(req.params.date);
//     const month = resDate.getMonth() + 1;
//     const year = resDate.getFullYear();
//     const result = await WorkDate.findAll({
//         where: {
//             date:{
//                 [Op.and]: {
//                    [Op.gte]: resDate,
//                    [Op.lte]: new Date(year, month, 0, 23, 59)
//         },                
//             }
//     },
//     });
//     res.json(result);
// }));


// app.get('/feedback',  asyncHandler( async (req, res) => {
//   let result = await Feedback.findAll();
//   res.status(200).json(result);
// }));

// app.get('/services', asyncHandler( async (req, res) => {
//     let types = '';
//     let services = '';
//     let descriptionItem = '';
//     types = await Type.findOne({
//         attributes: {
//             exclude: ['id'] 
//         },
//     });
//     let servicesWithType = await Services.findAll({
//         include: [{
//             model: DescriptionItem,
//             as: 'serviceDesc',
//         },
//         {
//             model: Type,
//             attributes: [],
//             as: 'servicesType',
//         }],
//         // attributes: {
//         //     exclude: ['id'] 
//         // },
//         where: {
//             typeId:{
//                 [Op.ne]: null                
//             }
//     },
//     });
//     let servicesWithoutType = await Services.findAll({
//         include: [{
//             model: DescriptionItem,
//             as: 'serviceDesc',
//         },
//         {
//             model: Type,
//             attributes: [],
//             as: 'servicesType',
//         }],
//         // attributes: {
//         //     exclude: ['id'] 
//         // },
        
//         where: {
//             typeId:{
//                 [Op.eq]: null                
//             }
//     },
//     });

//     let fullData = [{services: servicesWithoutType }, {name: types.name, services: servicesWithType }];
//     res.json(fullData);

//         res.json(services);
// }));
// let tryCounter = 0;
// app.post('/login', function  (req, res) {
//     tryCounter++;
//     if(tryCounter > 10) res.sendStatus(403);
//     const userName = req.body.login;
//     const userPass = req.body.password;
//     var salt = bcrypt.genSaltSync(saltRounds);
//   var hash = bcrypt.hashSync(`${userPass}`, salt);
//   let result = bcrypt.compareSync(`${process.env.ADMIN_PASS}`, hash);
//   if (userName !== process.env.ADMIN_LOGIN) {
//     return res.status(401).json({ message: "Неверный логин!" });
//   }
//   if (!result) {
//     return res.status(401).send({
//       message: "Неверный пароль!",
//     });
//   }
//   const token = jwt.sign({ adminName: process.env.ADMIN_LOGIN },
//     `${SECRET}`,
//     {
//       algorithm: 'HS256',
//       allowInsecureKeySizes: true,
//       expiresIn: 86400, // 24 hours
//     });

//   const options = {
//     httpOnly: true,
// };
// tryCounter = 0;
// res.cookie('accessToken', token, options);
// res.sendStatus(200);
// });



// app.get('/logout', function  (req, res) {
//   res.clearCookie("accessToken");
//   res.json(req.cookies);
// });

// app.get('/auth', function  (req, res) {
//     const token = req.cookies.accessToken;
//     console.log("token = " + token);
//     try{
//         var decoded = jwt.verify(token, SECRET);
//         res.status(200).json({
//             ct: token,
//             decoded: decoded
//         });
//     } catch(err){
//         res.sendStatus(403);
//     }
// });
// //check auth,  doesn't work on netlify
// // app.use((req, res, next) => {
// //     const token = req.cookies.accessToken;
// //     jwt.verify(token, SECRET,  function(err, decoded) {
// //         if(err || decoded.adminName !== process.env.ADMIN_LOGIN) {
// //             res.sendStatus(403);
// //             // res.end;
// //         } else {
// //             next();    
// //         }
        
// //     });
// // })

// app.get('/addDate/:date.:time', asyncHandler( async (req, res) => {
//     const [wd, created] = await WorkDate.findOrCreate({
//         where: { date: new Date(req.params.date) },
//     });

//     const newTime = await WorkTime.create({
//         time: req.params.time,
//         workDateId: wd.id
//     });
//      res.status(200).json({newDate: created, id: newTime.id }); 

// }));

// app.get('/removeTime/:date.:timeId',  asyncHandler( async (req, res) => {
//     let responseObject = {removeDate: false};
//     await WorkTime.destroy({
//         where: {
//             id: req.params.timeId,
//         },
//     });
    
//     const count = await WorkTime.count({
//         include: [{
//             model: WorkDate,
//             attributes: [],
//             as: 'date',
//             where:{
//                 date: {
//                     [Op.eq]: new Date(req.params.date), 
//                 }
//             },
//         }],
//     });
    
//     if(count === 0){
//         await WorkDate.destroy({
//             where: {
//                 date: new Date(req.params.date),
//             },
//         });
//         responseObject.removeDate = true;
//     }
//     res.status(200).json(responseObject);
   
// }));

// app.post('/addFeedback',  asyncHandler( async (req, res) => {
//   let result = await Feedback.create(req.body.newFeedback);
//   res.status(200).json(result);
// }));
// app.post('/removeFeedback',  asyncHandler( async (req, res) => {
//   let result = await Feedback.destroy({
//       where: {
//         id: req.body.id,
//       },
//     });
//   res.status(200).json({isRemove: result});
// }));

// app.post('/updateFeedback',  asyncHandler( async (req, res) => {
//     const feedback = req.body.newFeedback;
//     let result = await Feedback.update(
//         {   
//             name: feedback.name,
//             text: feedback.text
//         },
//         {
//             where: {
//                 id: feedback.id,
//             },
//         },
//     );
//     res.status(200).json(result);
// }));

// app.post('/updateServiceDescCost',  asyncHandler( async (req, res) => {
//     const serviceDesc = req.body.serviceDesc;
//     let countUpdated = 0;

//     serviceDesc.forEach(async (c) => {
//         countUpdated++;
//         await DescriptionItem.update(
//         {   
//             cost: c.cost,
//             minCost: c.minCost,
//             maxCost: c.maxCost,
//         },
//         {
//             where: {
//                 id: c.id,
//             },
//         },
//     );
//     })

//     res.sendStatus(200);
// }));

// app.post('/updateServiceCost',  asyncHandler( async (req, res) => {
//     const services = req.body.services;
//     let countUpdated = 0;

//     services.forEach(async (c) => {
//         countUpdated++;
//         await Services.update(
//         {   
//             cost: c.cost,
//             minCost: c.minCost,
//             maxCost: c.maxCost,
//         },
//         {
//             where: {
//                 id: c.id,
//             },
//         },
//     );
//     })

//     res.sendStatus(200);
// }));

// app.get('/servicesCost', asyncHandler( async (req, res) => {
//     let types = '';
//     let services = '';
//     let descriptionItem = '';
//     types = await Type.findOne({
//         attributes: {
//             exclude: ['id'] 
//         },
//     });
//     let servicesWithType = await Services.findAll({
//         include: [{
//             model: DescriptionItem,
//             as: 'serviceDesc',
//         },
//         {
//             model: Type,
//             attributes: [],
//             as: 'servicesType',
//         }],
//         attributes: {
//             exclude: ['typeId','descTitle','descContent','descComment'] 
//         },
//         where: {
//             typeId:{
//                 [Op.ne]: null                
//             }
//     },
//     });
//     let servicesWithoutType = await Services.findAll({
//         include: [{
//             model: DescriptionItem,
//             as: 'serviceDesc',
//         },
//         {
//             model: Type,
//             attributes: [],
//             as: 'servicesType',
//         }],
//         attributes: {
//             exclude: ['typeId','descTitle','descContent','descComment'] 
//         },
//         where: {
//             typeId:{
//                 [Op.eq]: null                
//             }
//     },
//     });
    
//     let fullData = [{services: servicesWithoutType }, {name: types.name, services: servicesWithType }];
//     res.json(fullData);
// }));

app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3000);
})
