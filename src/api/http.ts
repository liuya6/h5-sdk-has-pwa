import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
  AxiosError,
} from "axios";
import { HttpErrorEnum } from "./httpErrorEnum";
import { MStorage } from "@/util";

const instance = axios.create({});
const CancelTokenSourceMap = new Map();

const http = {
  ...instance,
  request<T = any>(config: AxiosRequestConfig) {
    return instance.request<T, T>(config);
  },
  get<T = any>(url: string, config?: AxiosRequestConfig) {
    return instance.get<T, T>(url, config);
  },
  delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return instance.delete<T, T>(url, config);
  },
  head<T = any>(url: string, config?: AxiosRequestConfig) {
    return instance.head<T, T>(url, config);
  },
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.post<T, T>(url, data, config);
  },
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.put<T, T>(url, data, config);
  },
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    return instance.patch<T, T>(url, data, config);
  },
  abort(url: string) {
    const source: CancelTokenSource | null = CancelTokenSourceMap.get(url);
    if (source) {
      source.cancel();
      CancelTokenSourceMap.delete(url);
    }
  },
  abortAll() {
    CancelTokenSourceMap.forEach((source: CancelTokenSource) => {
      source.cancel();
    });
    CancelTokenSourceMap.clear();
  },
};

instance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    if (!config.cancelToken) {
      const source = axios.CancelToken.source();
      config.cancelToken = source.token;
      CancelTokenSourceMap.set(config.url, source);
    }
    config.headers = Object.assign(
      {
        "os-type": 1,
      },
      config.headers
    );
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function dealApiError(responseData: ResponseAll) {
  if (responseData.errorCode === HttpErrorEnum.TOKEN_INVALID) {
    MStorage.removeItem("token");
    // const url = decodeURIComponent(
    //   MStorage.getItem(StorageItemName.hallIndexUrl) || ""
    // );
    // if (url) {
    //   window.location.href = url;
    // } else if (get(store, "state.user.merchantConfig.pwdLogin", false)) {
    //   window.location.href = "/login";
    // }
  }
  if (
    [
      HttpErrorEnum.SYS_ERR,
      HttpErrorEnum.HYSTRIX_ERROR,
      HttpErrorEnum.TOO_MANY_REQUESTS,
    ].includes(responseData.errorCode as HttpErrorEnum)
  ) {
    // notify(intl(`HTTP_ERROR.${responseData.errorCode}`));
  }
}

instance.interceptors.response.use(
  function (response: AxiosResponse<any>) {
    // 删除cancel token
    CancelTokenSourceMap.delete(response.config.url);
    const responseData = response.data as ResponseAll;
    // 后台业务错误
    if (responseData.errorCode) {
      if (response.request.responseURL.indexOf("single-newest-result") === -1) {
        dealApiError(responseData);
      }
      return Promise.reject(responseData);
    }
    return response.data;
  },
  function (error: AxiosError<ResponseError>) {
    // const doNotNotifuUrlArr: Array<any> = [
    //   "/wps/api/baccarat-ani",
    //   "/wps/api/down5",
    // ];
    // if (doNotNotifuUrlArr.includes(error.config.url)) {
    //   return Promise.reject(error);
    // }
    // 删除cancel token
    // const url = get(error, "config.url", "");
    // if (url) {
    //   CancelTokenSourceMap.delete(error.config.url);
    // }
    // http abort 导致的请求取消
    if (error && error.toString && error.toString() === "Cancel") {
      return Promise.reject(error);
    }
    // 后台业务错误
    // if (get(error.response, "data.errorCode")) {
    //   dealApiError(error.response!.data);
    //   return Promise.reject(error.response!.data);
    // } else if (get(error, "message") !== "Request aborted") {
    //   // 网络错误
    //   http.abortAll();
    //   // notify(get(error, "message", ""));
    //   notify("网络错误");
    // }
    return Promise.reject(error);
  }
);

export { http };
