import axios, {AxiosRequestConfig} from "axios";
import {Realm,RealmXSource,ApiSourceInfo} from "src/constants/realms";

export const apiCall = async <T>(url: string, realm: Realm, params?: { [key: string]: any }) => {
  try {
    const data = {
      secret: realm === Realm.MISTBLADE ? process.env.STORMFORGE_SECRET_KEY : process.env.SECRET_KEY,
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

    const apiSource = RealmXSource[realm];
    const apiInfo = ApiSourceInfo[apiSource];

    const apiEndpoint = `${apiInfo.baseUrl}?apikey=${apiInfo.key()}`;

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
