import path from "path";
import {NextFunction, Request, Response} from "express";

export const getTSMAppData = (req: Request, res: Response, next: NextFunction) => {
  const filePath = path.join(process.env.OUTPUT_DIR!, "AppData.lua");
  res.download(filePath);
};
