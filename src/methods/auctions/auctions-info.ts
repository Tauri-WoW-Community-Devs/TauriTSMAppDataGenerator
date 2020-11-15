import {apiCall, Realms} from "../../lib/api";

export const getAuctionsInfo = () => apiCall<AuctionsInfoResult>("auctions-info", Realms.TAURI);

type AuctionsInfoResult = {
  isCata: boolean;
  expansion: number;
  realm: string;
  dataUrlPrefix: string;
  lastModified: number;
}
