import {NextFunction, Request, Response} from "express";
import {generateTSMAppData} from "../services/generateTSMAppData";
import {getQueryRealms} from "../utils";

export const getTSMAppData = async (req: Request, res: Response, next: NextFunction) => {
  const realms = getQueryRealms(req);

  const lua = await generateTSMAppData(realms);

  const cacheTime = 5;

  const now = new Date();
  const expires = new Date();
  expires.setMinutes(now.getMinutes() + cacheTime);

  res.set({
    "Content-Type": "text/plain",
  });

  res.status(200).send(lua);
  next();
};
