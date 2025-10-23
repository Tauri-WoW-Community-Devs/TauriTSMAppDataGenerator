import cron from "node-cron";
import {Realm} from "./constants/realms";
import {initDotEnv} from "./lib/env";
import {initServer} from "./lib/server";
import {cacheAuctionData} from "./services/cacheAuctionData";
import {log} from "./utils";

initDotEnv();
initServer();

const realms = [
  Realm.TAURI,
  Realm.EVERMOON,
  Realm.MISTBLADE,
  Realm.SHEILUN,
];

const fetchAllRealmsData = async () => {
  log("Starting CRON realm data fetch.");
  try {
    for (const realm of realms) {
      log(`${realm.toString()} - start`);
      await cacheAuctionData(realm);
      log(`${realm.toString()} - end`);
    }
    log("CRON realm data fetch finished successfully.");
  } catch (error) {
    if (error instanceof Error) {
      log(`CRON realm data fetch failed: ${error.message}`, "ERROR");
    } else {
      log("CRON realm data fetch failed with an unknown error.", "ERROR");
    }
  }
};

log("Performing initial data fetch...");
fetchAllRealmsData();

log("Setting up cron job...");
cron.schedule("* * * * *", () => {
  log("Cron job triggered");
  fetchAllRealmsData();
});
