import * as winston from "winston"

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
)

export const loggerConfig = {
  level: process.env.LOG_LEVEL || "info",
  format: logFormat,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
      silent: process.env.NODE_ENV === "test",
    }),
    new winston.transports.File({
      filename: "logs/app.log",
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    }),
  ],
}
