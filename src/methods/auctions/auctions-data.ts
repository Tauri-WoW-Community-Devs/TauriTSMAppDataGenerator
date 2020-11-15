import {apiCall, Realms} from "../../lib/api";

export const getAuctionsData = () => apiCall<AuctionsDataResult>("auctions-data", Realms.TAURI);

// region Types
export type AuctionsDataResult = {
  isCata: boolean
  expansion: number
  realm: string
  dataUrlPrefix: string
  lastModified: number
  auctions: Auctions
}

type Auctions = {
  auctioner_2: AuctionItem[] // Alliance
  auctioner_6: AuctionItem[] // Horde
  auctioner_7: AuctionItem[] // Neutral
}

enum TimeLeft {
  VeryLong = "VERY_LONG",
  Long = "LONG",
  Medium = "MEDIUM",
  Short = "SHORT"
}

export type AuctionItem = {
  auc: number
  item: number
  itemData: ItemData
  owner: string
  ownerRealm: Realms
  bid: number
  buyout: number
  timeLeft: TimeLeft
  stackCount: number
  rand: number
  seed: number
  battlepet?: BattlePet
}

type ItemData = {
  itemName: string
  itemIcon: string
  itemLevel: number
  minLevel: number
  rarity: number
}

type BattlePet = {
  battlepetdata: BattlePetData
}

type BattlePetData = {
  speciesdata: SpeciesData
  pettype_name: string
  breed: number
  quality: number
  quality_color: string
  level: number
  creatureid: number
  petname: string
  icon: string
  maxhealth: number
  power: number
  speed: number
}

type SpeciesData = {
  SpeciesID: number
  CreatureID: number
  IconFileID: number
  SummonSpellID: number
  PetType: number
}
// endregion
