import axios, {AxiosRequestConfig} from "axios";

export const apiCall = async <T>(url: string, realm: Realms, params?: {[key: string]: any}) => {
  try {
    const data = {
      secret: process.env.SECRET_KEY,
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

    const result = await axios.post<APIResponse<T>>(`http://chapi.tauri.hu/apiIndex.php?apikey=${process.env.API_KEY}`, data, config);
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
}
