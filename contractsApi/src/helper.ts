import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { User } from "./models/user";
import mysql from 'mysql2/promise';
import sequelize from "./sequelize";
const expire = {
  day: 86400, // 24 hours
  month: 2592000, // 30 days
  quarter: 7776000, // 90 days
}
const tokenOptions = {
      httpOnly: true,
    };
export const getLoginFromToken = (req: Request) => {
  const accessToken = req.cookies.accessToken;
  var decoded = jwt.verify(accessToken, `${process.env.SECRET}`) as User;
  return decoded.login;
}

const getToken = (login: string, isRefreshTocken?: boolean): string => {
  const expireDate = isRefreshTocken ? expire.quarter : expire.day;
  const payload = { expireIn:  Date.now() / 1000 + expireDate, login: login};
  const token = jwt.sign(
    payload,
    `${process.env.SECRET}`,
    {
      algorithm: 'HS256',
      allowInsecureKeySizes: true,
      expiresIn: expireDate,
    });

   return token;
}

export const newTokenToRes = (res: Response, login: string) => {
  const newAccessToken = getToken(login);
  const newRefreshToken = getToken(login, true);
  res.cookie('accessToken', newAccessToken, tokenOptions);
  res.cookie('refreshToken', newRefreshToken, tokenOptions);
}

export const creteContractDB = () => mysql.createConnection({
      user : process.env.MYSQL_ADMIN,
      password : process.env.MYSQL_ADMIN_PASSWORD,
    }).then((connection: any) => {
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