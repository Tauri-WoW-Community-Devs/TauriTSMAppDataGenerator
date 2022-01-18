import fs from "fs";
import path from "path";
import {config} from "dotenv";

export const initDotEnv = () => {
  let envFile = "";
  try {
    envFile = ".env.local";
    if (!fs.existsSync(path.resolve(envFile)))
      envFile = ".env";
  } catch (err) {
    envFile = ".env";
  }

  config({
    path: envFile
  });

  const envVariables = ["API_KEY", "SECRET_KEY"];
  envVariables.forEach(env => {
    if (!process.env[env])
      throw new Error(`Missing .env variable: ${env}`);
  });
};
