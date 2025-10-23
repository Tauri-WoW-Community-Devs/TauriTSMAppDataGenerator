import express from "express";
import {checkPrices} from "../routes/checkPrices";
import {getTSMAppData} from "../routes/getTSMAppData";
import {healthCheck} from "../routes/health";

export const initServer = () => {
  if (!process.env.SERVER_PORT) {
    console.info("SERVER_PORT env variable is not set. Server won't start.");
    return;
  }

  const app = express();
  app.set("etag", false);
  app.disable("x-powered-by");

  app.use(express.json());
  const PORT = Number(process.env.SERVER_PORT);

  app.get("/", (req, res) => res.send("/wave"));
  app.get("/health", healthCheck);
  app.get("/get-tsm-appdata", getTSMAppData);
  app.post("/check-prices", checkPrices);
  app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at port ${PORT}`);
  });
};
