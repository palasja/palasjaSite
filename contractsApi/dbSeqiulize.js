import {Sequelize, DataTypes, STRING}  from 'sequelize';
import 'dotenv/config';
let sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_ADMIN,
    process.env.MYSQL_ADMIN_PASSWORD,
            // "palasjaDB",
            // "palasja",
            // "wania-0806",
          {
            dialect: "mysql",
            host: process.env.MYSQL_HOST,
            port: 3306,
            pool: {
              max: 10,
              min: 0,
            }
          }
        );``
    const Organization = sequelize.define("organization", 
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
    );
    const Personal = sequelize.define("personal", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        middleName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        firstNameR: {
          type: DataTypes.STRING,
        },
        middleNameR: {
          type: DataTypes.STRING,
        },
        lastNameR: {
          type: DataTypes.STRING,
        },
        positionName:{
        type: DataTypes.STRING,
        allowNull: false
        },
        isHead: {
          type: DataTypes.BOOLEAN,
        },
        orgId:{
          type: Sequelize.INTEGER,
        },
      },
      {
            freezeTableName: true,
            timestamps: false,
        });
    Organization.hasMany(Personal, {as: "personal"});
    Personal.belongsTo(Organization, {
      foreignKey: "orgId",
      as: "personalOrg",
      onDelete: 'CASCADE',
    });


    const Service = sequelize.define("service", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        user: {
          type: DataTypes.STRING,
        },
        place: {
          type: DataTypes.STRING,
        },
        cost: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        count: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        ispaid: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING
        },
        orgId:{
          type: Sequelize.INTEGER,
        },
      },
      {
            freezeTableName: true,
            timestamps: false,
        });
    Organization.hasMany(Service, {as: "service"});
    Service.belongsTo(Organization, {
      foreignKey: "orgId",
      as: "serviceOrg",
      onDelete: 'CASCADE',
    });
    const Contracts = sequelize.define("contracts", {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        number: {
          type: DataTypes.STRING,
          allowNull: false
        },
        signDate: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        startDate: {
          type: DataTypes.DATEONLY,
          allowNull: false
        },
        endDate: {
          type: DataTypes.DATEONLY,
        },
        scan: {
          type: DataTypes.TEXT('long')
        },
        orgId:{
          type: Sequelize.INTEGER,
        },
      },
      {
            freezeTableName: true,
            timestamps: false,
        });
    Organization.hasMany(Contracts, {as: "contracts"});
    Contracts.belongsTo(Organization, {
      foreignKey: "orgId",
      as: "contractOrg",
      onDelete: 'CASCADE',
    });
    const Users = sequelize.define(
      'users', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        login: {
          type: DataTypes.STRING,
          allowNull: false
        }, 
        password: {
          type: DataTypes.STRING,
          allowNull: false
        }
      }
    );

    const SoftArticleLinks = sequelize.define(
      'softLinks', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }, 
        url: {
          type: DataTypes.STRING,
          allowNull: false
        },
      },
      {
            freezeTableName: true,
            timestamps: false,
        });

    const SoftArticle = sequelize.define(
      'softArticle', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }, 
        info: {
          type: DataTypes.TEXT,
        },
      },
      {
            freezeTableName: true,
            timestamps: false,
        });      
      SoftArticle.hasMany(SoftArticleLinks, {as: "softLinks", onDelete: 'cascade'});
    SoftArticleLinks.belongsTo(SoftArticle, {
      foreignKey: "softArticleId",
      as: "softArticleLinks",
      onDelete: 'CASCADE',
    });

    const SoftInfo = sequelize.define(
      'softInfo', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }, 
      },
      {
            freezeTableName: true,
            timestamps: false,
        });
      SoftInfo.hasMany(SoftArticle, {as: "softArticle", onDelete: 'cascade'});
    SoftArticle.belongsTo(SoftInfo, {
      foreignKey: "softInfoId",
      as: "softInfo",
      onDelete: 'CASCADE',
    });
    

export {sequelize, Organization, Personal, Contracts,Service, Users, SoftInfo, SoftArticle, SoftArticleLinks}