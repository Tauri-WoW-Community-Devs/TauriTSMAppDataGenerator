import fs from "fs";
import path from "path";
import {getAuctionsInfo} from "../methods/auctions/auctions-info";
import {AuctionItem, getAuctionsData} from "../methods/auctions/auctions-data";
import {Realms} from "../lib/api";

let lastModified = 0;

type TSMRealmInfo = {
  alliance: TSMItemObject;
  horde: TSMItemObject;
}

type TSMItem = {
  m: number; // Market value
  b: number; // Min buyout
  n: number; // Count / number of auctions
}

type TSMItemObject = {
  [key in string]: TSMItem
}

export const generateTSMAppData = async () => {
  const aInfo = await getAuctionsInfo();
  if (!aInfo || aInfo.lastModified <= lastModified)
    return;

  const auctions = await getAuctionsData();
  if (!auctions?.auctions)
    return;

  const alliance = parseAHInfo(auctions.auctions.auctioner_2);
  const horde = parseAHInfo(auctions.auctions.auctioner_6);

  const data: TSMRealmInfo = {alliance, horde};
  const lua = generateFile(data, aInfo.lastModified);

  lastModified = aInfo.lastModified;
  return lua;
};

const generateFile = (data: TSMRealmInfo, lastMod: number) => {
  const realms = [Realms.TAURI, Realms.EVERMOON];

  const json = JSON.stringify(data);

  let appData = "";
  realms.forEach(realm => {
    appData += `\t["${realm}-Both-${lastMod}"] = '${json}',\n`;
  });

  const lua = `local TSM = select(2, ...)
TSM.AppData = {
${appData}
}`;

  const outDir = process.env.OUTPUT_DIR!;

  fs.mkdirSync(outDir, {recursive: true});
  fs.writeFileSync(path.join(outDir, "AppData.lua"), lua);
};

const parseAHInfo = (items: AuctionItem[]): TSMItemObject => {
  items = items.filter(item => item.buyout > 0);

  const groupedById = items.reduce(
    (entryMap, e) => entryMap.set(e.item, [...entryMap.get(e.item) || [], e]),
    new Map()
  );

  const result: TSMItemObject = {};
  groupedById.forEach((auctions: AuctionItem[], itemId: number) => {
    const buyouts = auctions.map(x => Math.round(x.buyout / (x.stackCount || 1))).sort();
    result[`${itemId}`] = {
      m: calculateMarketValue(buyouts),
      b: Math.min(...buyouts),
      n: buyouts.length
    };
  });

  return result;
};

const calculateMarketValue = (prices: number[]) => {
  let prevPrice = 0;
  let price = 0;
  const count = prices.length;

  let passes = [];

  for (let i = 0; i < count; i++) {
    prevPrice = price;
    price = prices[i];

    if (i < count * 0.15 || prevPrice * 1.2 >= price) {
      passes.push(price);
      continue;
    }
    break;
  }

  passes = deleteAtypical(passes);
  return Math.round(avg(passes));
};

const deleteAtypical = (prices: number[]) => {
  const average = avg(prices);
  const std = standardDeviation(prices) * 1.5;

  const lowest = average - std;
  const highest = average + std;

  return prices.filter(price => price >= lowest && price <= highest);
};

const standardDeviation = (prices: number[]) => {
  const n = prices.length;
  const average = avg(prices);
  return Math.sqrt(prices.map(x => Math.pow(x - average, 2)).reduce((a, b) => a + b) / n);
};

const sum = (prices: number[]) => prices.reduce((prev, curr) => prev + curr);
const avg = (prices: number[]) => sum(prices) / prices.length;
