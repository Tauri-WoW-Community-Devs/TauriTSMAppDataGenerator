import {Realm} from "../../constants/realms";
import {apiCall} from "../../lib/api";

export const fetchAuctionsInfo = (realm: Realm = Realm.TAURI) => apiCall<AuctionsInfoResult>("auctions-info", realm);

export type AuctionsInfoResult = {
  isCata: boolean;
  expansion: number;
  realm: string;
  dataUrlPrefix: string;
  lastModified: number;
}
