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
const {sequelize, Organization, Contracts, Personal, Service, Users, SoftInfo, SoftArticle, SoftArticleLinks} = require('./dbSeqiulize');
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
const newTokenToRes = (res) => {
    const options = {
      httpOnly: true,
    };

    const newAccessToken = getToken({ expireIn: Date.now() / 1000 + 5}, 5);
    const newRefreshToken = getToken({ expireIn:  Date.now() / 1000 + expire.quarter}, expire.quarter);
    res.cookie('accessToken', newAccessToken, options);
    res.cookie('refreshToken', newRefreshToken, options);

    res.cookie('expireDate', Date.now()  + 5 * 1000, { expires: new Date(Date.now()+ 5000) });
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

// router.get('/test', function  (req, res) {
//      res.status(200).json({test:'123'});
// });
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
newTokenToRes(res);
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
          newTokenToRes(res);
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
  const refreshToken = req.cookies.refreshToken;
  if(accessToken){
    jwt.verify(accessToken, `${SECRET}`, (err, decoded) => {
      if (err && err.name == 'TokenExpiredError') {
        jwt.verify(refreshToken, SECRET, (err, decoded) => {
          if (err) {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.sendStatus(401);
          } else {
            newTokenToRes(res);
            res.sendStatus(200);
          }
        });
      } else {
           res.sendStatus(200);
      }
      });
  } else {
    res.sendStatus(401);
  }
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
            newTokenToRes(res);
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
    name: req.body.name
  });
  res.status(200).json(result);
}));
router.delete('/removeOrganization/:id',  asyncHandler( async (req, res) => {
  let result = await Organization.destroy({
      where: {
        id:  req.params.id,
      },
    });
    const statusCode = result == true ? 200 : 400;
    res.status(statusCode).json(result);
}));
router.patch('/updateOrganization',  asyncHandler( async (req, res) => {
    const organization = req.body;
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
  let result = await Contracts.create(req.body);
  res.status(200).json(result);
}));
router.delete('/removeContract/:id',  asyncHandler( async (req, res) => {
  let result = await Contracts.destroy({
      where: {
        id: req.params.id,
      },
    });
  const statusCode = result == true ? 200 : 400;
  res.status(statusCode).json(result);
}));
router.patch('/updateContract',  asyncHandler( async (req, res) => {
    const contract = req.body;
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
  let result = await Personal.create(req.body);
  res.status(200).json(result);
}));
router.delete('/removePersonal/:id',  asyncHandler( async (req, res) => {
  let result = await Personal.destroy({
      where: {
        id:  req.params.id,
      },
    });
  res.status(200).json({isRemove: result});
}));
router.patch('/updatePersonal',  asyncHandler( async (req, res) => {
    const personal = req.body;
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
  let orgId = req.params.id;
  if(orgId == '0') orgId = null;
  let result = await Service.findAll({
      where: {
        orgId: orgId,
      },
    });
  res.status(200).json(result);
}));
router.get('/getServicesByOrgIdMonth/:orgId/:month', asyncHandler( async (req, res) => {
  const month = Number(req.params.month);
  let orgId = req.params.orgId;
  if(orgId == '0') orgId = null;
  const firstWorkDayDate  = new Date(2025, month);
  const lastWorkDayDate = new Date(2025, month+1, 0, 23, 59 );
  
   let result = await Service.findAll({
  where: {
    orgId: orgId,
    ispaid: true,
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
router.get('/getServicesUnpaidByOrgId/:orgId', asyncHandler( async (req, res) => {
  let orgId = req.params.orgId;
  if(orgId == '0') orgId = null;
  let result = await Service.findAll({
  where: {
    orgId: orgId,
    ispaid: false
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
router.get('/getServicesCost',  asyncHandler( async (req, res) => {
  let result = await Service.findAll({
    attributes:  ['id', 'cost', 'count', 'orgId', 'date'] 
    });
  res.status(200).json(result);
}));
router.patch('/servicesToPaid',  asyncHandler( async (req, res) => {
  const servicesId = req.body;
  let result = await Service.update(
    {ispaid: true},
    {where: {id: servicesId}}
  );
  res.status(200).json(result.length);
}));
router.patch('/servicesToUnpaid',  asyncHandler( async (req, res) => {
  const servicesId = req.body;
  let result = await Service.update(
    {ispaid: false},
    {where: {id: servicesId}}
  );
  res.status(200).json(result.length);
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
  let result = await Service.create(req.body);
  res.status(200).json(result);
}));
router.delete('/removeService/:id',  asyncHandler( async (req, res) => {
  let result = await Service.destroy({
      where: {
        id: req.params.id,
      },
    });
  res.status(200).json({isRemove: result});
}));
router.patch('/updateService',  asyncHandler( async (req, res) => {
    const service = req.body;
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

router.get('/getSoftInfo',  asyncHandler( async (req, res) => {
  let result = await SoftInfo.findAll({
    include: [{
        model: SoftArticle,
        as: 'softArticle',
        attributes:['id', 'name']
      }]
  });
  res.status(200).json(result);
}));
router.put('/addSoftInfo',  asyncHandler( async (req, res) => {
  let result = await SoftInfo.create(req.body);
  res.status(200).json(result);
}));
router.delete('/removeSoftInfo/:id',  asyncHandler( async (req, res) => {
  let result = await SoftInfo.destroy({
      where: {
        id:  req.params.id,
      },
    });
    const statusCode = result == true ? 200 : 400;
    res.status(statusCode).json(result);
}));
router.patch('/updateSoftInfo',  asyncHandler( async (req, res) => {
    const softInfo = req.body;
    let result = await SoftInfo.update(
        softInfo,
        {
            where: {
                id: softInfo.id,
            },
        },
    );
    res.status(200).json(result);
}));


router.get('/getSoftArticle/:id',  asyncHandler( async (req, res) => {
  let result = await SoftArticle.findOne({
    where: {
      id: req.params.id
    },
  });
  res.status(200).json(result);
}));
router.put('/addSoftArticle',  asyncHandler( async (req, res) => {
  let result = await SoftArticle.create({
    name: req.body.name,
    info: req.body.info,
    softInfoId: req.body.softInfoId,
  });

  res.status(200).json(result);
}));
router.delete('/removeSoftArticle/:id',  asyncHandler( async (req, res) => {
  let result = await SoftArticle.destroy({
      where: {
        id:  req.params.id,
      },
    });
    const statusCode = result == true ? 200 : 400;
    res.status(statusCode).json(result);
}));
router.patch('/updateSoftArticle',  asyncHandler( async (req, res) => {
  const softArticle = req.body;
  let result = await SoftArticle.update(
    softArticle,
    {
      where: {
          id: softArticle.id,
      },
    },
  );
  res.status(200).json(result);
}));


router.get('/getSoftArticleLinksByArticleId/:id',  asyncHandler( async (req, res) => {
  let result = await SoftArticleLinks.findAll({
    where: {
      softArticleId: req.params.id
    },
  });
  res.status(200).json(result);
}));
router.put('/addSoftArticleLinks',  asyncHandler( async (req, res) => {
  let result = await SoftArticleLinks.bulkCreate(req.body)
  res.status(200).json(result);
}));
router.delete('/removeSoftArticleLink/:id',  asyncHandler( async (req, res) => {
  let result = await SoftArticleLinks.destroy({
      where: {
        id:  req.params.id,
      },
    });
    const statusCode = result == true ? 200 : 400;
    res.status(statusCode).json(result);
}));
router.patch('/updateArticleLinks',  asyncHandler( async (req, res) => {
    const softArticleLinks = req.body;
    let result = await SoftArticleLinks.bulkCreate(softArticleLinks, { updateOnDuplicate: ["id"] })
    res.status(200).json(result);
}));
// path as /api/service
app.use('/api', router);

app.listen(3000, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3000);
})
