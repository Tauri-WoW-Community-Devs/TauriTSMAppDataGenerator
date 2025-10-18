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

let fetchAHInProgress = false;

// Every minute
cron.schedule("* * * * *", async () => {
  if (fetchAHInProgress) return;

  try {
    fetchAHInProgress = true;
    for (const realm of realms) {
      log(`${realm.toString()} - start`);
      await cacheAuctionData(realm);
      log(`${realm.toString()} - end`);
    }
  } finally {
    fetchAHInProgress = false;
  }
});
