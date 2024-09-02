import {Realm} from "../../constants/realms";
import {apiCall} from "../../lib/api";
import {AuctionsDataResult} from "./auctions-data";

export const fetchAuctionsItemPrices = (item: number, realm: Realm = Realm.TAURI) => apiCall<AuctionsDataResult>("auctions-item-prices", realm, {item});
