import path from "path";
import {NextFunction, Request, Response} from "express";

export const getTSMAppData = (req: Request, res: Response, next: NextFunction) => {
  const isStormforge = req.query.isStormforge;
  
  let filePath = path.join(process.env.OUTPUT_DIR!, "AppData.lua");
  if(isStormforge == "1")
  {
    filePath = path.join(process.env.STORMFORGE_OUTPUT_DIR!, "AppData.lua");
  }
  
  res.download(filePath);
};
