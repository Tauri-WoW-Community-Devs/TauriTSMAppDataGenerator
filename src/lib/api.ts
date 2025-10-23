import axios, {AxiosRequestConfig} from "axios";
import {ApiSourceInfo, Realm, RealmXSource} from "../constants/realms";
import {log} from "../utils";

export const apiCall = async <T>(url: string, realm: Realm, params?: Record<string, unknown>) => {
  try {
    const config: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "TauriTSMAppDataGenerator"
      },
      timeout: 15000,
    };

    const apiSource = RealmXSource[realm];
    const apiInfo = ApiSourceInfo[apiSource];

    const apiEndpoint = `${apiInfo.baseUrl}?apikey=${apiInfo.key()}`;

    const data = {
      secret: apiInfo.secret(),
      url,
      params: {
        r: realm,
        ...params,
      }
    };

    const result = await axios.post<APIResponse<T>>(apiEndpoint, data, config);
    return result.data.response;
  } catch (err) {
    if (err instanceof Error) {
      log(`API call for ${url} on realm ${realm} failed: ${err.message}`, "ERROR");
    } else {
      log(`API call for ${url} on realm ${realm} failed: ${String(err)}`, "ERROR");
    }
  }
};

export type APIResponse<T> = {
  success: boolean;
  errorcode: number;
  errorstring: string;
  response: T;
};
