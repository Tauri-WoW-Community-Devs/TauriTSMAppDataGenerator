import {log} from "console";
import {Realm} from "../constants/realms";
import type {TSMFileData} from "../lib/tsm";
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

  log("Generating AppData.lua");

  const keys = Object.keys(fileData) as Realm[];

  const isLegion = keys.some(realm => fileData[realm]?.expansion === 6);

  if (isLegion) {
    log("Generated AppData.lua for Legion");
    return generateLegionAppData(fileData);
  } else {
    log("Generated AppData.lua for Mists");
    return generateMistsAppData(fileData);
  }
};
