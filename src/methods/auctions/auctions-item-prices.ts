import {apiCall, Realms} from "../../lib/api";
import {AuctionsDataResult} from "./auctions-data";

export const getAuctionsItemPrices = (item: number, realm: Realms = Realms.TAURI) => apiCall<AuctionsDataResult>("auctions-item-prices", realm, {item});
