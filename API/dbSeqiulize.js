import {Sequelize, DataTypes}  from 'sequelize';

let sequelize = new Sequelize(
            "palasjaDB",
            "palasja",
            "wania-0806",
          {
            dialect: "mysql",
            host: "127.0.0.1",
            port: 3306,
            //charset: 'utf8',
            //collate: 'utf8_general_ci',
            pool: {
              max: 10,
              min: 0,
            //   acquire: config.pool.acquire,
            //   idle: config.pool.idle
            }
          }
        );
const Organization = sequelize.define("organization", {
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
    });
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
        head: {
          type: DataTypes.BOOLEAN
        },
        sign: {
          type: DataTypes.BOOLEAN
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
          type: DataTypes.BOOLEAN,
          allowNull: false
        },
        sign: {
          type: DataTypes.BOOLEAN
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
    });
    const Contracts = sequelize.define("constracts", {
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
          type: DataTypes.BLOB
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
    });
export {sequelize, Organization, Personal, Contracts,Service}