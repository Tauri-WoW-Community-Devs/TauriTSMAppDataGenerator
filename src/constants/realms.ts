export enum Realm {
  TAURI = "[HU] Tauri WoW Server",
  EVERMOON = "[EN] Evermoon",
  // WOD = "[HU] Warriors of Darkness",
  MISTBLADE = "Mistblade"
}

export enum ApiSource {
  TAURI,
  STORMFORGE,
}

export const RealmXSource = {
  [Realm.TAURI]: ApiSource.TAURI,
  [Realm.EVERMOON]: ApiSource.TAURI,
  [Realm.MISTBLADE]: ApiSource.STORMFORGE,
};

export const ApiSourceInfo = {
  [ApiSource.TAURI]: {
    baseUrl: "http://chapi.tauri.hu/apiIndex.php",
    key: () => process.env.API_KEY,
    secret: () => process.env.SECRET_KEY,
  },
  [ApiSource.STORMFORGE]: {
    baseUrl: "https://characters-api.stormforge.gg/v1/",
    key: () => process.env.STORMFORGE_API_KEY,
    secret: () => process.env.STORMFORGE_SECRET_KEY,
  },
};
