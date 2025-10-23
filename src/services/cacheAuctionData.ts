import {log} from "console";
import {Realm} from "../constants/realms";
import {cache} from "../lib/cache";
import {TSMItemObject, TSMRealmInfo, parseAHInfo} from "../lib/tsm";
import {AuctionItem, fetchAuctionsData} from "../methods/auctions/auctions-data";
import {AuctionsInfoResult, fetchAuctionsInfo} from "../methods/auctions/auctions-info";

const getCacheRealm = (realm: Realm): Realm => {
  if (realm === Realm.TAURI || realm === Realm.EVERMOON) {
    // Those realms have cross-realm AH, share cache as well.
    // Pick Evermoon since it has higher pop
    // If Tauri realm is ever going to shut down - at least we have a prevention.
    return Realm.TAURI;
  }
  return realm;
};

export const cacheAuctionData = async (realm: Realm): Promise<TSMRealmInfo | undefined> => {
  const realmForCache = getCacheRealm(realm);
  const realmName = realmForCache.toString();
  const aInfo = await fetchAuctionsInfo(realmForCache);
  if (!aInfo) {
    log(`${realmName} - fetchAuctionsInfo - no response from server`, "WARN");
    return;
  }

  const lastAInfo = cache.get<AuctionsInfoResult>(`fetchAuctionsInfo-${realmName}`);
  if (lastAInfo && lastAInfo.lastModified >= aInfo.lastModified) {
    log(`${realmName} - Cache up-to date`);
    return cache.get<TSMRealmInfo>(`tsmData-${realmName}`);
  }

  const auctions = await fetchAuctionsData(realmForCache);
  if (!auctions?.auctions) {
    log(`${realmName} - No auctions were found`, "WARN");
    return;
  }

  let alliance: TSMItemObject;
  let horde: TSMItemObject;

  const ah = auctions.auctions;
  const ahKeys = Object.keys(ah);

  let sharedSourceData: AuctionItem[] | undefined;
  if (ah.auctioner_7) {
    sharedSourceData = ah.auctioner_7;
  } else if (ahKeys.length === 1) {
    const key = ahKeys[0] as keyof typeof ah;
    sharedSourceData = ah[key];
  }

  if (sharedSourceData) {
    const shared = parseAHInfo(sharedSourceData);
    log(`${realmName} - Parsing AH Info - Shared`);
    alliance = shared;
    horde = shared;
  } else {
    alliance = parseAHInfo(ah.auctioner_2 || []);
    log(`${realmName} - Parsing AH Info - Alliance`);
    horde = parseAHInfo(ah.auctioner_6 || []);
    log(`${realmName} - Parsing AH Info - Horde`);
  }

  const data: TSMRealmInfo = {
    alliance,
    horde,
    lastModification: aInfo.lastModified,
    expansion: aInfo.expansion,
  };

  log(`${realmName} - Caching new data`);
  cache.set(`fetchAuctionsInfo-${realmName}`, aInfo);
  cache.set(`tsmData-${realmName}`, data);

  return data;
};

export const getCachedData = (realm: Realm): Promise<TSMRealmInfo | undefined> => {
  const realmForCache = getCacheRealm(realm);
  const realmName = realmForCache.toString();

  const dataKey = `tsmData-${realmName}`;
  const dataCache = cache.get<TSMRealmInfo>(dataKey);

  if (dataCache)
    return Promise.resolve(dataCache);

  return cacheAuctionData(realm);
};
