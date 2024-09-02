import {log} from "console";
import {Realm} from "../constants/realms";
import type {TSMFileData} from "../lib/tsm";
import {getCachedData} from "./cacheAuctionData";

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

  let appData = "";
  keys.forEach(realm => {
    const realmData = fileData[realm];
    if (!realmData)
      return;

    const {lastModification, ...ahData} = realmData;
    const json = JSON.stringify(ahData);

    // Can't remember anymore - was "Both" related to cross-faction AH?
    appData += `\t["${realm}-Both-${lastModification}"] = '${json}',\n`;
  });

  log("Generated AppData.lua");

  return `local TSM = select(2, ...)
TSM.AppData = {
${appData}
}`;
};
