import {apiCall, Realms} from "../../lib/api";

export const getAuctionsInfo = (realm: Realms = Realms.TAURI) => apiCall<AuctionsInfoResult>("auctions-info", realm);

type AuctionsInfoResult = {
  isCata: boolean;
  expansion: number;
  realm: string;
  dataUrlPrefix: string;
  lastModified: number;
}
