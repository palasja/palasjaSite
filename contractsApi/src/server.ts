import dotenv from 'dotenv';
dotenv.config();
import asyncHandler from 'express-async-handler';
import express, { Application, Request, Response } from 'express';

import { Organization } from './models/organization';
import bcrypt from 'bcryptjs';
import Sequelize, { Op } from '@sequelize/core';
import { Personal } from './models/personal';
import { Price } from './models/price';
import { Service } from './models/service';
import { ServiceCostChange } from './models/serviceCostChange';
import { SoftArticle } from './models/softArticle';
import { SoftInfo } from './models/softInfo';
import { User } from './models/user';
import jwt from 'jsonwebtoken';
import { Contract } from './models/contracts';
import { SoftArticleLink } from './models/softArticleLink';
import { JwtError, JwtDecoded, UserType } from './types';
import { newTokenToRes, getLoginFromToken, creteContractDB } from './helper';
import { createFilesFolder, getBase64ByFileName, removeFile, saveFile } from './nodeFunc';
import sequelize from './sequelize';

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const saltRounds = 10;
const app: Application = express();

app.use(cookieParser());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

const router = express.Router();

creteContractDB();

//Create folder for files
createFilesFolder();

router.post(
  '/signIn',
  asyncHandler(async (req, res) => {
    const admin = await User.findAll();
    if (admin.length !== 0) {
      res.sendStatus(403);
      return;
    } else {
      const userName = req.body.login;
      const userPass = req.body.password;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(`${userPass}`, salt);

      await User.create({
        login: userName,
        password: hash,
      });

      newTokenToRes(res, userName);
      res.sendStatus(200);
    }
  })
);
router.post(
  '/logIn',
  asyncHandler(async (req, res) => {
    const admin = await User.findOne({
      where: {
        login: req.body.login,
      },
    });
    const accessToken = req.cookies.accessToken;

    jwt.verify(accessToken, `${process.env.SECRET}`, (err: JwtError, _: JwtDecoded) => {
      if (err) {
        const userName = req.body.login;
        const userPass = req.body.password;

        if (admin == null) {
          res.sendStatus(403);
        } else {
          const isPassCorrect = bcrypt.compareSync(userPass, admin.password);
          if (isPassCorrect && userName == admin.login) {
            newTokenToRes(res, userName);
            res.sendStatus(200);
          } else {
            res.sendStatus(403);
          }
        }
      } else {
        res.sendStatus(200);
      }
    });
  })
);

router.post(
  '/checkAuth',
  asyncHandler(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (accessToken) {
      jwt.verify(accessToken, `${process.env.SECRET}`, (err: JwtError, _: JwtDecoded) => {
        if (err && err.name == 'TokenExpiredError') {
          jwt.verify(
            refreshToken,
            `${process.env.SECRET}`,
            (err: JwtError, decoded: JwtDecoded) => {
              if (err) {
                res.clearCookie('accessToken');
                res.clearCookie('refreshToken');
                res.sendStatus(401);
              } else {
                newTokenToRes(res, (decoded as UserType).login);
                res.sendStatus(200);
              }
            }
          );
        } else {
          res.sendStatus(200);
        }
      });
    } else {
      res.sendStatus(401);
    }
  })
);
router.get('/logout', function (req, res) {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.sendStatus(200);
});
router.use((req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  if (accessToken) {
    jwt.verify(accessToken, `${process.env.SECRET}`, (err: JwtError, _: JwtDecoded) => {
      if (err && err.name == 'TokenExpiredError') {
        jwt.verify(refreshToken, `${process.env.SECRET}`, (err: JwtError, decoded: JwtDecoded) => {
          if (err) {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            res.sendStatus(401);
            return;
          } else {
            newTokenToRes(res, (decoded as UserType).login);
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
});
router.get(
  '/getOrganizations',
  asyncHandler(async (req, res) => {
    let result = await Organization.findAll();
    res.status(200).json(result);
  })
);
router.put(
  '/addOrganization',
  asyncHandler(async (req, res) => {
    let result = await Organization.create({
      name: req.body.name,
    });
    res.status(200).json(result);
  })
);
router.delete(
  '/removeOrganization/:id',
  asyncHandler(async (req, res) => {
    let result = await Organization.destroy({
      where: {
        id: req.params.id,
      },
    });
    const statusCode = result == 1 ? 200 : 400;
    res.status(statusCode).json(result);
  })
);
router.patch(
  '/updateOrganization',
  asyncHandler(async (req, res) => {
    const organization = req.body;
    let result = await Organization.update(organization, {
      where: {
        id: organization.id,
      },
    });
    res.status(200).json(result);
  })
);

router.get(
  '/getContractsByOrg/:id',
  asyncHandler(async (req, res) => {
    let result = await Contract.findAll({
      where: {
        orgId: req.params.id,
      },
    });
    res.status(200).json(result);
  })
);
router.get(
  '/getContractByOrgIdMonth/:orgId/:month/:year',
  asyncHandler(async (req, res) => {
    const month = Number(req.params.month);
    const year = Number(req.params.year);
    const orgId = req.params.orgId;
    const firstWorkDayDate = new Date(year, month);
    const lastWorkDayDate = new Date(year, month + 1, 0, 23, 59);

    let result = await Contract.findOne({
      where: {
        orgId: orgId,
        [Op.and]: [
          {
            [Op.or]: [
              Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('start_date')), month + 1),
              {
                startDate: {
                  [Op.lte]: firstWorkDayDate,
                },
              },
            ],
          },

          {
            endDate: {
              [Op.gte]: lastWorkDayDate,
            },
          },
        ],
      },
    });
    res.status(200).json(result);
  })
);



router.put(
  '/addContracts',
  asyncHandler(async (req, res) => {
    try {
      const contract = saveFile(req.body);

      let result = await Contract.create(contract);
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }

  })
);
router.delete(
  '/removeContract/:id',
  asyncHandler(async (req, res) => {
    const contract = await Contract.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['fileName']
    })
    try {
      if (contract) await removeFile(contract.fileName);
      let result = await Contract.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (result == 1) {
        res.status(200).json(result);
      } else {
        throw new Error("Error during delete from base")
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  })
);
router.patch(
  '/updateContract',
  asyncHandler(async (req, res) => {
    const contract = saveFile(req.body);
    let result = await Contract.update(contract, {
      where: {
        id: contract.id,
      },
    });
    res.status(200).json(result);
  })
);
router.get(
  '/contractScan/:fileName',
  asyncHandler(async (req, res) => {
    try {
      const fileBase64 = getBase64ByFileName(req.params.fileName as string);
      res.status(200).json({ scan: fileBase64 });
    } catch (e) {
      console.error(e);
      res.sendStatus(404);
    }

  })
);
router.get(
  '/getPersonalByOrgId/:id',
  asyncHandler(async (req, res) => {
    let result = await Personal.findAll({
      where: {
        orgId: req.params.id,
      },
    });
    res.status(200).json(result);
  })
);
router.put(
  '/addPersonal',
  asyncHandler(async (req, res) => {
    let result = await Personal.create(req.body);
    res.status(200).json(result);
  })
);
router.delete(
  '/removePersonal/:id',
  asyncHandler(async (req, res) => {
    let result = await Personal.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ isRemove: result });
  })
);
router.patch(
  '/updatePersonal',
  asyncHandler(async (req, res) => {
    const personal = req.body;
    let result = await Personal.update(personal, {
      where: {
        id: personal.id,
      },
    });
    res.status(200).json(result);
  })
);
router.get(
  '/getServicesByOrgId/:id',
  asyncHandler(async (req, res) => {
    let result = await Service.findAll({
      where: {
        orgId: req.params.id,
      },
    });
    res.status(200).json(result);
  })
);
router.get(
  '/getServicesByOrgIdMonth/:orgId/:month/:year',
  asyncHandler(async (req, res) => {
    const month = Number(req.params.month);
    const year = Number(req.params.year);
    const firstWorkDayDate = new Date(year, month);
    const lastWorkDayDate = new Date(year, month + 1, 0, 23, 59);

    let result = await Service.findAll({
      where: {
        orgId: req.params.orgId,
        ispaid: true,
        [Op.and]: [
          {
            date: {
              [Op.gte]: firstWorkDayDate,
            },
          },
          {
            date: {
              [Op.lte]: lastWorkDayDate,
            },
          },
        ],
      },
    });
    res.status(200).json(result);
  })
);
router.get(
  '/getServicesUnpaidByOrgId/:orgId',
  asyncHandler(async (req, res) => {
    let result = await Service.findAll({
      where: {
        orgId: req.params.orgId,
        ispaid: false,
      },
    });
    res.status(200).json(result);
  })
);
router.get(
  '/getServicesByMonth/:month/:year',
  asyncHandler(async (req, res) => {
    const month = Number(req.params.month);
    const year = Number(req.params.year);
    const firstWorkDayDate = new Date(year, month);
    const lastWorkDayDate = new Date(year, month + 1, 0, 23, 59);

    let result = await Service.findAll({
      where: {
        [Op.and]: [
          {
            date: {
              [Op.gte]: firstWorkDayDate,
            },
          },
          {
            date: {
              [Op.lte]: lastWorkDayDate,
            },
          },
        ],
      },
    });
    res.status(200).json(result);
  })
);
router.get(
  '/getServicesCost',
  asyncHandler(async (req, res) => {
    let result = await Service.findAll({
      attributes: ['id', 'cost', 'count', 'orgId', 'date'],
    });
    res.status(200).json(result);
  })
);
router.patch(
  '/servicesToPaid',
  asyncHandler(async (req, res) => {
    const servicesId = req.body;
    let result = await Service.update({ ispaid: true }, { where: { id: servicesId } });
    res.status(200).json(result.length);
  })
);
router.patch(
  '/servicesToUnpaid',
  asyncHandler(async (req, res) => {
    const servicesId = req.body;
    let result = await Service.update({ ispaid: false }, { where: { id: servicesId } });
    res.status(200).json(result.length);
  })
);
router.put(
  '/addService',
  asyncHandler(async (req, res) => {
    let result = await Service.create(req.body);
    await ServiceCostChange.create({
      date: Date.now(),
      user: getLoginFromToken(req),
      newCost: req.body.cost,
      serviceId: result.id,
    });
    res.status(200).json(result);
  })
);
router.delete(
  '/removeService/:id',
  asyncHandler(async (req, res) => {
    let result = await Service.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ isRemove: result });
  })
);
router.patch(
  '/updateService',
  asyncHandler(async (req, res) => {
    try {
      const result = await sequelize.transaction(async () => {
        const service = req.body;
        const id = service.id;
        delete service.id;
        let result = await Service.update(service, {
          where: {
            id: id,
          },
        });
        // await ServiceCostChange.create({
        //   date: Date.now(),
        //   user: getLoginFromToken(req),
        //   newCost: req.body.cost,
        //   serviceId: req.body.id,
        // });
        return result
      });

      res.status(200).json(result); 
    } catch (error: any) {
      // 1. Log for you to see in the terminal
      console.error('SEQUELIZE ERROR:', error);

      // 2. Return a more descriptive response for development
      res.status(500).json({
        message: 'Internal Server Error',
        //@ts-check
        details: error?.message, // Hide this in production for security!
        error: JSON.stringify(error),
      });
    }
  })
);

router.get(
  '/serviceCostChangeById/:id',
  asyncHandler(async (req, res) => {
    let result = await ServiceCostChange.findAll({
      where: {
        serviceId: req.params.id,
      },
      order: [['date', 'DESC']],
    });
    res.status(200).json(result);
  })
);

router.get(
  '/getServicesCostChangeByOrgIdMonth/:orgId/:month/:year',
  asyncHandler(async (req, res) => {
    const month = Number(req.params.month);
    const year = Number(req.params.year);
    const firstWorkDayDate = new Date(year, month);
    const lastWorkDayDate = new Date(year, month + 1, 0, 23, 59);

    let result = await ServiceCostChange.findAll({
      include: [
        {
          model: Service,
          as: 'service',
          attributes: ['id', 'date', 'isPaid', 'orgId'],
          where: {
            orgId: req.params.orgId == '0' ? null : req.params.orgId,
            ispaid: true,
            [Op.and]: [
              {
                date: {
                  [Op.gte]: firstWorkDayDate,
                },
              },
              {
                date: {
                  [Op.lte]: lastWorkDayDate,
                },
              },
            ],
          },
        },
      ],
    });
    res.status(200).json(result);
  })
);
router.get(
  '/getServicesCostChangeUnpaidByOrgId/:orgId',
  asyncHandler(async (req, res) => {
    let result = await ServiceCostChange.findAll({
      include: [
        {
          model: Service,
          as: 'service',
          attributes: [],
          where: {
            orgId: req.params.orgId == '0' ? null : req.params.orgId,
            ispaid: false,
          },
        },
      ],
    });
    res.status(200).json(result);
  })
);



router.get(
  '/getSoftInfo',
  asyncHandler(async (req, res) => {
    let result = await SoftInfo.findAll({
      include: [
        {
          model: SoftArticle,
          as: 'softArticle',
          attributes: ['id', 'name'],
        },
      ],
    });
    res.status(200).json(result);
  })
);
router.put(
  '/addSoftInfo',
  asyncHandler(async (req, res) => {
    let result = await SoftInfo.create(req.body);
    res.status(200).json(result);
  })
);
router.delete(
  '/removeSoftInfo/:id',
  asyncHandler(async (req, res) => {
    let result = await SoftInfo.destroy({
      where: {
        id: req.params.id,
      },
    });
    const statusCode = result == 1 ? 200 : 400;
    res.status(statusCode).json(result);
  })
);
router.patch(
  '/updateSoftInfo',
  asyncHandler(async (req, res) => {
    const softInfo = req.body;
    let result = await SoftInfo.update(softInfo, {
      where: {
        id: softInfo.id,
      },
    });
    res.status(200).json(result);
  })
);

router.get(
  '/getSoftArticle/:id',
  asyncHandler(async (req, res) => {
    let result = await SoftArticle.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(result);
  })
);
router.put(
  '/addSoftArticle',
  asyncHandler(async (req, res) => {
    let result = await SoftArticle.create({
      name: req.body.name,
      info: req.body.info,
      softInfoId: req.body.softInfoId,
    });

    res.status(200).json(result);
  })
);
router.delete(
  '/removeSoftArticle/:id',
  asyncHandler(async (req, res) => {
    let result = await SoftArticle.destroy({
      where: {
        id: req.params.id,
      },
    });
    const statusCode = result == 1 ? 200 : 400;
    res.status(statusCode).json(result);
  })
);
router.patch(
  '/updateSoftArticle',
  asyncHandler(async (req, res) => {
    const softArticle = req.body;
    let result = await SoftArticle.update(softArticle, {
      where: {
        id: softArticle.id,
      },
    });
    res.status(200).json(result);
  })
);

router.get(
  '/getSoftArticleLinksByArticleId/:id',
  asyncHandler(async (req, res) => {
    let result = await SoftArticleLink.findAll({
      where: {
        softArticleId: req.params.id,
      },
    });
    res.status(200).json(result);
  })
);
router.put(
  '/addSoftArticleLinks',
  asyncHandler(async (req, res) => {
    let result = await SoftArticleLink.bulkCreate(req.body);
    res.status(200).json(result);
  })
);
router.delete(
  '/removeSoftArticleLink/:id',
  asyncHandler(async (req, res) => {
    let result = await SoftArticleLink.destroy({
      where: {
        id: req.params.id,
      },
    });
    const statusCode = result == 1 ? 200 : 400;
    res.status(statusCode).json(result);
  })
);
router.patch(
  '/updateArticleLinks',
  asyncHandler(async (req, res) => {
    const softArticleLinks = req.body;
    let result = await SoftArticleLink.bulkCreate(softArticleLinks, { updateOnDuplicate: ['name', 'url'] });
    res.status(200).json(result);
  })
);

router.get(
  '/getPrice',
  asyncHandler(async (req, res) => {
    const result = await Price.findAll();
    res.status(200).json(result);
  })
);

router.patch(
  '/updatePrice',
  asyncHandler(async (req, res) => {
    const newPrice = req.body;
    let result = await Price.update(newPrice, {
      where: {
        id: newPrice.id,
      },
    });
    res.status(200).json(result);
  })
);
router.delete(
  '/removePrice/:id',
  asyncHandler(async (req, res) => {
    let result = await Price.destroy({
      where: {
        id: req.params.id,
      },
    });
    const statusCode = result == 1 ? 200 : 400;
    res.status(statusCode).json(result);
  })
);
router.put(
  '/addPrice',
  asyncHandler(async (req, res) => {
    let result = await Price.create(req.body);
    res.status(200).json(result);
  })
);

app.use('/api', router);

// Start the server
app.listen(process.env.API_PORT, function (err) {
  if (err) console.log('Error in server setup');
  console.log('Server listening on Port', process.env.API_PORT);
});
