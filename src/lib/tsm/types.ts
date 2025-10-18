import {Realm} from "../../constants/realms";

export type TSMRealmInfo = {
  alliance: TSMItemObject;
  horde: TSMItemObject;
  lastModification: number;
  expansion: number;
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
