import {NextFunction, Request, Response} from "express";
import {generateTSMAppData} from "../services/generateTSMAppData";
import {getQueryRealms} from "../utils";

export const getTSMAppData = async (req: Request, res: Response, next: NextFunction) => {
  const realms = getQueryRealms(req);

  const lua = await generateTSMAppData(realms);

  res.set({
    "Content-Type": "text/plain",
    "Cache-Control": `public, max-age=${300}, must-revalidate`,
  });

  res.status(200).send(lua);
  next();
};
