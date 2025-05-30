var express = require('express');
var path = require('path');
// var mysql = require('mysql');
  const mysql = require('mysql2/promise');
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
 mysql.createConnection({
        user     : "palasja",
        password : "wania-0806"
    }).then((connection) => {
        connection.query('CREATE DATABASE IF NOT EXISTS gusMaryDb;').then(() => {
                sequelize.sync()
                    .then(() => {
                        console.log("Connection to DB was successful");
                        })
                    .catch(err => {
                        console.error("Unable to connect to DB", err);
                    });
        })
        
    })
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
app.listen(3003, function(err){
    if (err) console.log("Error in server setup")
    console.log("Server listening on Port", 3003);
})
