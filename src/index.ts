import cron from "node-cron";
import {Realm} from "src/constants/realms";
import {cacheAuctionData} from "src/services/cacheAuctionData";
import {log} from "src/utils";
import {initDotEnv} from "./lib/env";
import {initServer} from "./lib/server";

initDotEnv();
initServer();

const realms = [Realm.TAURI, Realm.EVERMOON, Realm.MISTBLADE, Realm.MISTBLADE_S2];

let fetchAHInProgress = false;

// Every minute
cron.schedule("* * * * *", async () => {
  if (fetchAHInProgress)
    return;

  try {
    fetchAHInProgress = true;
    for (const realm of realms) {
      log(`${realm.toString()} - start`);
      await cacheAuctionData(realm);
      log(`${realm.toString()} - end`);
    }
  }
  finally {
    fetchAHInProgress = false;
  }
});

