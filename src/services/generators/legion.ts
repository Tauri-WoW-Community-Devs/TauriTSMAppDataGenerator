import {Realm} from "../../constants/realms";
import type {TSMFileData, TSMItemObject} from "../../lib/tsm";

const generateAuctionDBBlock = (data: TSMItemObject, realmName: string, timestamp: number): string => {
  if (Object.keys(data).length === 0) {
    return "";
  }

  const sortedItemIds = Object.keys(data).sort((a, b) => parseInt(a) - parseInt(b));
  const dataRows = sortedItemIds.map(itemId => {
    const item = data[itemId];
    return `            {${itemId}, ${item.b}, ${item.m}, ${item.n}, ${item.m}}`;
  }).join(",\n");

  return `TSM.LoadData("AUCTIONDB_MARKET_DATA", "${realmName}", [[\n    return {\n        downloadTime=${timestamp},\n        fields={"itemID", "minBuyout", "marketValue", "numAuctions", "historical"},\n        data={\n${dataRows}\n        }\n    }\n]])`;
};


export const generateLegionAppData = (fileData: TSMFileData): string => {
  const auctionDBData: string[] = [];
  const keys = Object.keys(fileData) as Realm[];

  keys.forEach((realm) => {
    const realmData = fileData[realm];
    if (!realmData) return;

    const {lastModification, alliance, horde, expansion} = realmData;

    if (expansion >= 6) {
      const block = generateAuctionDBBlock(alliance, realm, lastModification);
      if (block) {
        auctionDBData.push(block);
      }
    } else {
      const allianceBlock = generateAuctionDBBlock(alliance, `${realm}-Alliance`, lastModification);
      if (allianceBlock) {
        auctionDBData.push(allianceBlock);
      }

      const hordeBlock = generateAuctionDBBlock(horde, `${realm}-Horde`, lastModification);
      if (hordeBlock) {
        auctionDBData.push(hordeBlock);
      }
    }
  });

  return `local TSM = select(2, ...)\n\n${auctionDBData.join("\n\n")}`;
};
