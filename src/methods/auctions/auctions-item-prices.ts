import {apiCall} from "src/lib/api";
import {Realm} from "src/constants/realms";
import {AuctionsDataResult} from "./auctions-data";

export const fetchAuctionsItemPrices = (item: number, realm: Realm = Realm.TAURI) => apiCall<AuctionsDataResult>("auctions-item-prices", realm, {item});
