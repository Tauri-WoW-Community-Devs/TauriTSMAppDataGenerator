import cron from "node-cron";
import {Realm} from "./constants/realms";
import {initDotEnv} from "./lib/env";
import {initServer} from "./lib/server";
import logger from "./lib/logger";
import {cacheAuctionData} from "./services/cacheAuctionData";

initDotEnv();
initServer();

const realms = [
  Realm.TAURI,
  Realm.EVERMOON,
  Realm.MISTBLADE,
  Realm.SHEILUN,
];

const fetchAllRealmsData = async () => {
  logger.info("Starting CRON realm data fetch.");
  try {
    for (const realm of realms) {
      logger.info(`${realm.toString()} - start`);
      await cacheAuctionData(realm);
      logger.info(`${realm.toString()} - end`);
    }
    logger.info("CRON realm data fetch finished successfully.");
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`CRON realm data fetch failed: ${error.message}`);
    } else {
      logger.error("CRON realm data fetch failed with an unknown error.");
    }
  }
};

logger.info("Performing initial data fetch...");
fetchAllRealmsData();

logger.info("Setting up cron job...");
cron.schedule("* * * * *", () => {
  logger.info("Cron job triggered");
  fetchAllRealmsData();
});

