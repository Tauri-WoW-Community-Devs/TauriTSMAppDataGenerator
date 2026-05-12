import {Request} from "express";
import {Realm} from "./constants/realms";

type Query = {
  realms?: {
    tauri?: string;
  };
}

export const getQueryRealms = (req: Request) => {
  let tauri = 1;
  const query = req.query as Query;
  if (typeof query.realms === "object" && query.realms !== null) {
    const queryRealms = query.realms;
    tauri = parseInt(queryRealms.tauri || "0") || 0;
  }

  const realms = [];
  if (tauri)
    realms.push(Realm.TAURI, Realm.EVERMOON);

  return realms;
};
