import axios, {AxiosRequestConfig} from "axios";

export const apiCall = async <T>(url: string, realm: Realms, params?: {[key: string]: any}) => {
  try {
    const data = {
      secret: realm == Realms.MB ?  process.env.STORMFORGE_SECRET_KEY : process.env.SECRET_KEY,
      url,
      params: {
        r: realm,
        ...params,
      }
    };

    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json"
      },
    };

    let apiEndpoint  = `http://chapi.tauri.hu/apiIndex.php?apikey=${process.env.API_KEY}`;
    
    if(realm == Realms.MB)
    {
      apiEndpoint = `https://characters-api.stormforge.gg/v1/?apikey=${process.env.STORMFORGE_API_KEY}`
    }


    const result = await axios.post<APIResponse<T>>(apiEndpoint, data, config);
    return result.data.response;
  } catch (err) {
    console.log(err);
  }
};

export type APIResponse<T> = {
  success: boolean;
  errorcode: number;
  errorstring: string;
  response: T;
};

export enum Realms {
  TAURI = "[HU] Tauri WoW Server",
  EVERMOON = "[EN] Evermoon",
  WOD = "[HU] Warriors of Darkness",
  MB = "Mistblade"
}
