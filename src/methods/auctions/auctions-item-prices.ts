import {apiCall, Realms} from "../../lib/api";
import {AuctionsDataResult} from "./auctions-data";

export const getAuctionsItemPrices = (item: number) => apiCall<AuctionsDataResult>("auctions-item-prices", Realms.TAURI, {item});
