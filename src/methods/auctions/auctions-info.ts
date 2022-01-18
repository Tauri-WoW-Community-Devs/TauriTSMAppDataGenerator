import {apiCall} from "src/lib/api";
import {Realm} from "src/constants/realms";

export const fetchAuctionsInfo = (realm: Realm = Realm.TAURI) => apiCall<AuctionsInfoResult>("auctions-info", realm);

export type AuctionsInfoResult = {
  isCata: boolean;
  expansion: number;
  realm: string;
  dataUrlPrefix: string;
  lastModified: number;
}
