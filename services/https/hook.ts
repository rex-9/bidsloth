import { useState } from "react";
import Axios from ".";
import isEmptyObj from "../snippets/emptyObject";

const useApiHook: () => (
  | ((
      url: string,
      data: object,
      method: "post" | "get" | "put" | "patch" | "delete"
    ) => void)
  | {
      data: {};
      isLoading: boolean;
      isError: boolean;
      isSuccess: boolean;
      error: {};
    }
)[] = () => {
  const [data, setData] = useState({});
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);

  const action = (
    url: string,
    data: object,
    method: "post" | "get" | "put" | "patch" | "delete"
  ) => {
    if (isEmptyObj(data) && isLoading) {
      setLoading(false);
    } else {
      setLoading(true);
    }

    Axios[method](url, data)
      .then((response: any) => {
        setData(response.data);
        setLoading(false);
        setSuccess(true);
      })
      .catch((err: any) => {
        setLoading(false);
        setIsError(true);
        setError(err.response);
      });
  };

  return [action, { data, isLoading, isError, isSuccess, error }];
};

export default useApiHook;
