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

const FetchContext = createContext<FetchContextValue | undefined>(undefined);

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

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
        res = await axios.request({ url, method, data, headers });
      } catch (err: any) {
        let message: any = "Errore nella richiesta. Riprova.";
        if (axios.isAxiosError(err)) {
          message = err?.response?.data;
        }
        toggleAlert(message.message, "danger");
      }

      setLoading(false);

      res?.data?.message && toggleAlert(res?.data?.message, "success");
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
