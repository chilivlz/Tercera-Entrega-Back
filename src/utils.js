import { fileURLToPath } from "url";
import { dirname } from "path"; 
import winston from "winston"
//import config from "./config.js"
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export default __dirname;

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




