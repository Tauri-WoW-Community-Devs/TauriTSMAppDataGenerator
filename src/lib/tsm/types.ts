import {Realm} from "src/constants/realms";

export type TSMRealmInfo = {
  alliance: TSMItemObject;
  horde: TSMItemObject;
  lastModification: number;
}

export type TSMFileData = {
  [key in Realm]?: TSMRealmInfo;
}

export type TSMItem = {
  m: number; // Market value
  b: number; // Min buyout
  n: number; // Count / number of auctions
}

export type TSMItemObject = {
  [key in string]: TSMItem
}
