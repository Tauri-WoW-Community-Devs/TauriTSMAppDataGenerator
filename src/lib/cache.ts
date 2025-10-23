import fs from "fs";
import path from "path";
import logger from "./logger";

const cacheDir = ".cache";

const init = () => {
  if (!fs.existsSync(cacheDir))
    fs.mkdirSync(cacheDir, {recursive: true});
};

const get = <T>(key: string): T | undefined => {
  init();

  const cachePath = path.resolve(cacheDir, key);
  if (!fs.existsSync(cachePath))
    return;

  try {
    const json = fs.readFileSync(cachePath, {flag: "r", encoding: "utf-8"});
    return JSON.parse(json) as T;
  } catch (e) {
    logger.error(`Failed to read cache key ${key}`);
  }
};

const set = (key: string, data: unknown) => {
  init();

  const cachePath = path.resolve(cacheDir, key);

  try {
    fs.writeFileSync(cachePath, JSON.stringify(data), {flag: "w", encoding: "utf-8"});
  } catch (e) {
    logger.error(`Failed to write cache key ${key}`);
  }
};

export const cache = {
  set,
  get,
};
