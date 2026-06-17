import { Sequelize, DataTypes } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';

import 'dotenv/config';

import { Organization } from './models/organization';
import { Personal } from './models/personal';
import { ServiceCostChange } from './models/serviceCostChange';
import { Service } from './models/service';
import { Contract } from './models/contracts';
import { User } from './models/user';
import { SoftArticleLink } from './models/softArticleLink';
import { SoftArticle } from './models/softArticle';
import { SoftInfo } from './models/softInfo';
import { Price } from './models/price';
let sequelize = new Sequelize({
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_ADMIN,
  password: process.env.MYSQL_ADMIN_PASSWORD,
  dialect: MySqlDialect,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  logging: console.log,
  define: {
    timestamps: false,
    // freezeTableName: true,
  },
  pool: {
    max: 10,
    min: 0,
  },
  models: [
    Personal,
    Organization,
    Service,
    ServiceCostChange,
    Contract,
    User,
    SoftInfo,
    SoftArticleLink,
    SoftArticle,
    Price,
  ],
});

// const safeChangeCostInfo = async (service: Service, options: any & {login: string}) => {
//   try {
//     // Access another model to write data
//     await ServiceCostChange.create({
//       date: Date.now(),
//       user: options.login,
//       newCost: service.cost,
//       serviceId: service.id,
//     });
//   } catch (error) {
//     console.error('Failed to add service detail to ServiceCostChange:', error);
//   }
// }
// Service.hooks.addListener('afterCreate',  safeChangeCostInfo)
// Service.hooks.addListener('afterUpdate',  safeChangeCostInfo)

export default sequelize;
