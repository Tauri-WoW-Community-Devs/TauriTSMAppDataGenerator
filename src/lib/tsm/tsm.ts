import {AuctionItem} from "src/methods/auctions/auctions-data";
import {TSMItemObject} from "src/lib/tsm/types";
import {calculateMarketValue} from "src/lib/tsm/math";

export const parseAHInfo = (items: AuctionItem[]): TSMItemObject => {
  items = items.filter(item => item.buyout > 0);

  const groupedById = items.reduce(
    (entryMap, e) => entryMap.set(e.item, [...entryMap.get(e.item) || [], e]),
    new Map()
  );

  const result: TSMItemObject = {};
  groupedById.forEach((auctions: AuctionItem[], itemId: number) => {
    const buyouts = auctions.map(x => Math.round(x.buyout / (x.stackCount || 1))).sort();
    result[`${itemId}`] = {
      m: calculateMarketValue(buyouts),
      b: Math.min(...buyouts),
      n: buyouts.length
    };
  });

  return result;
};
