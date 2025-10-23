import {Realm} from "../constants/realms";
import type {TSMFileData} from "../lib/tsm";
import logger from "../lib/logger";
import {getCachedData} from "./cacheAuctionData";
import {generateLegionAppData} from "./generators/legion";
import {generateMistsAppData} from "./generators/mists";

export const generateTSMAppData = async (realms: Realm[]) => {
  const fileData: TSMFileData = {};

  for (const realm of realms) {
    const data = await getCachedData(realm);
    if (!data)
      continue;

    fileData[realm] = data;
  }

  logger.info("Generating AppData.lua");

  const keys = Object.keys(fileData) as Realm[];

  const isLegion = keys.some(realm => fileData[realm]?.expansion === 6);

  if (isLegion) {
    logger.info("Generated AppData.lua for Legion");
    return generateLegionAppData(fileData);
  } else {
    logger.info("Generated AppData.lua for Mists");
    return generateMistsAppData(fileData);
  }
};
