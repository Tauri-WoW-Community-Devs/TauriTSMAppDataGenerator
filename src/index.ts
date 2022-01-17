import cron from "node-cron";
import {generateTSMAppData} from "./services/generateTSMAppData";
import {initDotEnv} from "./lib/env";
import {initServer} from "./lib/server";

initDotEnv();
initServer();

// Every minute
cron.schedule("* * * * *", async () => {
  await generateTSMAppData(false);
  await generateTSMAppData(true);
});
