import { fileURLToPath } from "url";
import { dirname } from "path"; 
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
import bcrypt from "bcrypt";
import winston from "winston";
import nodemailer from "nodemailer";
export default __dirname;

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, hashPassword) =>
  bcrypt.compareSync(password, hashPassword);


const customLevelsOptions = {
    levels: {
      fatal: 0,
      error: 1,
      warning: 2,
      info: 3,
      http: 4,
      debug: 5,
    },
    
    colors: {
      fatal: "red",
      error: "cyan",
      warning: "yellow",
      info: "green",
      http: "blue",
      debug: "white",
    },
  };
  
  export const logger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
      new winston.transports.Console({
        level: "debug",
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelsOptions.colors }),
          winston.format.simple()
        ),
      }),
      new winston.transports.File({
        filename: "./error.log",
        level: "info",
        format: winston.format.simple(),
      }),
    ],
  });


  export const sendEmailTransport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASS,
    },
  });
  




