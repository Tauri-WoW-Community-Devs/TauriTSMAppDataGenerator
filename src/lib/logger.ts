import winston from "winston";

const isProduction = process.env.NODE_ENV === "production";
const useJsonFormat = process.env.LOG_FORMAT !== "pretty" && isProduction;

const format = useJsonFormat
  ? winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json()
    )
  : winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      winston.format.errors({ stack: true }),
      winston.format.printf(
        (info: winston.Logform.TransformableInfo) =>
          `${info.timestamp} ${info.level}: ${info.message}`
      )
    );

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format,
  transports: [new winston.transports.Console()],
});

export default logger;