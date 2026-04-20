export enum Realm {
	TAURI = "[HU] Tauri WoW Server",
	EVERMOON = "[EN] Evermoon",
	// WOD = "[HU] Warriors of Darkness",
}

export enum ApiSource {
	TAURI,
}

export const RealmXSource = {
	[Realm.TAURI]: ApiSource.TAURI,
	[Realm.EVERMOON]: ApiSource.TAURI,
};

export const ApiSourceInfo = {
	[ApiSource.TAURI]: {
		baseUrl: "http://chapi.tauri.hu/apiIndex.php",
		key: () => process.env.API_KEY,
		secret: () => process.env.SECRET_KEY,
	},
};
