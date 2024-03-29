import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  IResponseUserData,
  ILoginFormInputs,
  IRegisterFormInputs,
} from "shared/types";
import { config } from "shared/const";
import { client } from "shared/api";
import { FullPageSpinner, FullPageError } from "shared/ui";
import { useAsync } from "shared/lib";
import { useNotification } from "app";

interface IState {
  user: IResponseUserData | null | undefined;
  login: (data: ILoginFormInputs) => Promise<IResponseUserData>;
  signup: (data: IRegisterFormInputs) => Promise<IResponseUserData>;
  logout: () => void;
}

const AuthContext = React.createContext<IState>({} as IState);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { run, data, error, isIdle, isLoading, isError, setData } = useAsync<
    IResponseUserData,
    Error
  >();
  const notification = useNotification();

  React.useEffect(() => {
    async function bootstrapUser() {
      const token = window.localStorage.getItem(config.localStorageKey);

      if (token) {
        const res = await client<IResponseUserData>("users/getUser").catch(
          (e) => {
            console.log(e);

            if (e.code !== 406) {
              notification.warning(e.message);
            }

            return { data: null };
          },
        );

        return res.data;
      }

      return null;
    }

    run(bootstrapUser());
  }, [run, notification]);

  const login = React.useCallback(
    async (data: ILoginFormInputs) => {
      return client<IResponseUserData>("users/login", { data }).then((res) => {
        window.localStorage.setItem(config.localStorageKey, res.data.token);
        setData(res.data);
        return res.data;
      });
    },
    [setData],
  );

  const signup = React.useCallback(
    async (data: IRegisterFormInputs) => {
      return client<IResponseUserData>("users/signup", { data }).then((res) => {
        window.localStorage.setItem(config.localStorageKey, res.data.token);
        setData(res.data);
        return res.data;
      });
    },
    [setData],
  );

  const logout = React.useCallback(() => {
    window.localStorage.removeItem(config.localStorageKey);
    queryClient.clear();
    setData(null);
  }, [queryClient, setData]);

  const value = React.useMemo(
    () => ({
      user: data,
      login,
      signup,
      logout,
    }),
    [data, login, signup, logout],
  );

  if (isLoading || isIdle) {
    return <FullPageSpinner />;
  }

  if (isError && error) {
    return <FullPageError error={error} />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
