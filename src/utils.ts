import {Request} from "express";
import {Realm} from "src/constants/realms";

type Query = {
  realms: {
    tauri: any;
    mistblade: any;
  }
}

export const getQueryRealms = (req: Request) => {
  // To assure backward compatibility - all desktop apps were only fetching Tauri AH data.
  let tauri = 1, mistblade = 0;
  if (req.query.realms !== undefined) {
    const queryRealms = (req.query as Query).realms || {};
    tauri = parseInt(queryRealms.tauri) || 0;
    mistblade = parseInt(queryRealms.mistblade) || 0;
  }

  const realms = [];
  if (tauri)
    realms.push(Realm.TAURI, Realm.EVERMOON);
  if (mistblade)
    realms.push(Realm.MISTBLADE);

  return realms;
};

export const log = (msg: string, type: "ERROR" | "WARN" | "OK" = "OK") => {
  let color = "\x1b[0m"; // RESET;
  if (type === "ERROR")
    color = "\x1b[31m";
  else if (type === "WARN")
    color = "\"\x1b[33m\"";
  console.log(color, `[TSM] ${msg}`);
};
