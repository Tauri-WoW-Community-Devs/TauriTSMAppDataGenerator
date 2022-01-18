import {Realm} from "src/constants/realms";
import {AuctionsInfoResult, fetchAuctionsInfo} from "src/methods/auctions/auctions-info";
import {cache} from "src/lib/cache";
import {log} from "src/utils";
import {fetchAuctionsData} from "src/methods/auctions/auctions-data";
import {parseAHInfo, TSMRealmInfo} from "src/lib/tsm";

export const cacheAuctionData = async (realm: Realm): Promise<TSMRealmInfo | undefined> => {
  if (realm === Realm.TAURI || realm === Realm.EVERMOON) {
    // Those realms have cross-realm AH, share cache as well.
    // Pick Evermoon since it has higher pop
    // If Tauri realm is ever going to shut down - at least we have a prevention .
    realm = Realm.TAURI;
  }

  const realmName = realm.toString();

  const aInfo = await fetchAuctionsInfo(realm);
  if (!aInfo) {
    log(`${realmName} - fetchAuctionsInfo - no response from server`, "WARN");
    return;
  }

  const lastAInfo = cache.get<AuctionsInfoResult>(`fetchAuctionsInfo-${realmName}`);
  if (lastAInfo && lastAInfo.lastModified >= aInfo.lastModified) {
    log(`${realmName} - Cache up-to date`);
    return cache.get<TSMRealmInfo>(`tsmData-${realmName}`);
  }

  const auctions = await fetchAuctionsData(realm);
  if (!auctions?.auctions) {
    log(`${realmName} - No auctions were found`, "WARN");
    return;
  }

  const alliance = parseAHInfo(auctions.auctions.auctioner_2);
  log(`${realmName} - Parsing AH Info - Alliance`);
  const horde = parseAHInfo(auctions.auctions.auctioner_6);
  log(`${realmName} - Parsing AH Info - Horde`);

  const data: TSMRealmInfo = {
    alliance,
    horde,
    lastModification: aInfo.lastModified,
  };

  cache.set(`fetchAuctionsInfo-${realmName}`, aInfo);
  cache.set(`tsmData-${realmName}`, data);

  return data;
};

export const getCachedData = (realm: Realm): Promise<TSMRealmInfo | undefined> => {
  const realmName = realm.toString();

  const dataKey = `tsmData-${realmName}`;
  const dataCache = cache.get<TSMRealmInfo>(dataKey);

  if (dataCache)
    return Promise.resolve(dataCache);

  return cacheAuctionData(realm);
};
