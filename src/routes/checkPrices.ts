import {NextFunction, Request, Response} from "express";
import {Realm} from "src/constants/realms";
import {fetchAuctionsItemPrices} from "../methods/auctions/auctions-item-prices";
import {AuctionItem} from "../methods/auctions/auctions-data";

type Faction = "ALLIANCE" | "HORDE" | "BOTH";
type Body = {
  [key in string]: {
    price: number;
    faction: Faction;
    realm: Realm;
  };
}

type Result = Array<Pick<AuctionItem, "timeLeft" | "stackCount">
  & {
  pricePerItem: AuctionItem["buyout"],
  itemId: AuctionItem["item"],
  itemName: AuctionItem["itemData"]["itemName"]
}>;

export const checkPrices = async (req: Request, res: Response, next: NextFunction) => {
  const {body}: {body: Body} = req;

  if (typeof body !== "object" || Object.keys(body).length <= 0)
  {
    res.status(400).end();
    return;
  }

  let result: Result = [];
  for (const itemId of Object.keys(body)) {
    const {price, faction, realm} = body[itemId];
    if (!price || !faction) {
      res.status(400).end();
      next();
      return;
    }

    const id = Number(itemId);

    const itemInfo = await fetchAuctionsItemPrices(id, realm);
    if (!itemInfo)
      continue;

    let auctions: AuctionItem[] = [];
    if (faction === "ALLIANCE")
      auctions = itemInfo.auctions.auctioner_2;
    else if (faction === "HORDE")
      auctions = itemInfo.auctions.auctioner_6;
    else if (faction === "BOTH")
      auctions = [...itemInfo.auctions.auctioner_2, ...itemInfo.auctions.auctioner_6];

    const items = auctions.filter(x => {
      const buyout = (x.buyout / (x.stackCount || 1));
      return buyout > 0 && buyout <= price;
    })
      .map(x => {
        const {buyout, stackCount, timeLeft, item, itemData} = x;
        return {itemId: item, itemName: itemData.itemName, pricePerItem: buyout / (stackCount || 1), stackCount, timeLeft};
      })
      .sort(x => x.pricePerItem);

    if (!items.length)
      continue;

    result = result.concat(items);
  }

  res.status(200).json(result);
  next();
};
