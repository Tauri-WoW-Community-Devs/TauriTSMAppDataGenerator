import {Realm} from "../../constants/realms";
import type {TSMFileData} from "../../lib/tsm";

export const generateMistsAppData = (fileData: TSMFileData): string => {
  let legacyAppData = "";
  const keys = Object.keys(fileData) as Realm[];

  keys.forEach(realm => {
    const realmData = fileData[realm];
    if (!realmData)
      return;

    const {lastModification, alliance, horde} = realmData;
    const json = JSON.stringify({alliance, horde});
    legacyAppData += `\t["${realm}-Both-${lastModification}"] = '${json}',\n`;
  });

  return `local TSM = select(2, ...)
TSM.AppData = {
${legacyAppData}
}`;
};
