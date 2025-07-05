import {
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  IResponseUserData,
  ILoginFormInputs,
  IRegisterFormInputs,
} from "shared/types";
import { FullPageSpinner, FullPageError } from "shared/ui";
import { CONFIG } from "shared/const";
import { client } from "shared/api";
import { useAsync } from "shared/lib";
import { useNotification } from "app";

interface IState {
  user: IResponseUserData | null | undefined;
  login: (data: ILoginFormInputs) => Promise<IResponseUserData>;
  signup: (data: IRegisterFormInputs) => Promise<IResponseUserData>;
  logout: () => void;
}

const AuthContext = createContext<IState>({} as IState);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { run, data, setData, error, isIdle, isLoading, isError } = useAsync<
    IResponseUserData,
    Error
  >();
  const notify = useNotification();

  useEffect(() => {
    async function bootstrapUser() {
      const token = window.localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY);

      if (token) {
        const res = await client<IResponseUserData>("users/getUser").catch(
          (e) => {
            console.log(e);

            if (e.code !== 406) {
              notify.showWarning(e.message);
            }

            return { data: null };
          }
        );

        return res.data;
      }

      return null;
    }

    run(bootstrapUser());
  }, [run, notify]);

  const signup = useCallback(
    async (data: IRegisterFormInputs) => {
      return client<IResponseUserData>("users/signup", { data }).then((res) => {
        window.localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY, res.data.token);
        setData(res.data);

        return res.data;
      });
    },
    [setData]
  );

  const login = useCallback(
    async (data: ILoginFormInputs) => {
      return client<IResponseUserData>("users/login", { data }).then((res) => {
        window.localStorage.setItem(CONFIG.LOCAL_STORAGE_KEY, res.data.token);
        setData(res.data);

        return res.data;
      });
    },
    [setData]
  );

  const logout = useCallback(() => {
    window.localStorage.removeItem(CONFIG.LOCAL_STORAGE_KEY);
    queryClient.clear();
    setData(null);
  }, [queryClient, setData]);

  const value = useMemo(
    () => ({
      user: data,
      login,
      signup,
      logout,
    }),
    [data, login, signup, logout]
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
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};

export { AuthProvider, useAuth };
