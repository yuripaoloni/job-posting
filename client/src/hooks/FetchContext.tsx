import { createContext, useCallback, useContext, useState } from "react";
import axios, { Method, AxiosRequestHeaders, AxiosResponse } from "axios";
import { useAlert } from "./AlertContext";

type FetchContextValue = {
  loading: boolean;
  fetchData: <T>(
    url: string,
    method: Method,
    data?: any,
    headers?: AxiosRequestHeaders
  ) => Promise<AxiosResponse<T, any> | undefined>;
};

type FetchProviderProps = { children: React.ReactNode };

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 403) {
      //TODO remove cookie or token
    }

    return Promise.reject(err);
  }
);

const FetchContext = createContext<FetchContextValue | undefined>(undefined);

const FetchProvider = ({ children }: FetchProviderProps) => {
  const [loading, setLoading] = useState(false);
  const { toggleAlert } = useAlert();

  const fetchData = useCallback(
    async (
      url: string,
      method: Method,
      data?: any,
      headers?: AxiosRequestHeaders
    ) => {
      setLoading(true);
      let res;

      try {
        res = await axios({ url, method, data, headers });
      } catch (err: any) {
        toggleAlert("Credenziali errate", "danger");
      }

      setLoading(false);
      return res;
    },
    [toggleAlert]
  );

  const value = {
    loading,
    fetchData,
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
};

const useFetch = () => {
  const context = useContext(FetchContext);

  if (context === undefined) {
    throw new Error("useFetch must be used within FetchProvider");
  }

  return context;
};

export { FetchProvider, useFetch };
