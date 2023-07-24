import React from "react";

import { queryClient, useNotification } from "app";
import { loginUser } from "entities/auth";
import { config } from "shared/const";
import { LOADING_STATE, ILoginFormInputs } from "shared/types";

interface AuthContextType {
  user: ILoginFormInputs | null;
  loadingState: LOADING_STATE;
  // register: (user: ILoginFormInputs, callback: VoidFunction) => void;
  login: (user: ILoginFormInputs, callback: VoidFunction) => void;
  logout: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const notification = useNotification();

  const [user, setUser] = React.useState<ILoginFormInputs | null>(null);
  const [loadingState, setLoadingState] = React.useState(LOADING_STATE.IDLE);

  // const register = (userData: ILoginFormInputs, callback: VoidFunction) => {
  //   return fakeAuthProvider.register(() => {
  //     setUser(userData);

  //     localStorage.setItem(
  //       config.LOCAL_STORAGE_KEY,
  //       JSON.stringify(userData.username)
  //     );

  //     callback();
  //   });
  // };

  const login = async (userData: ILoginFormInputs, callback: VoidFunction) => {
    setLoadingState(LOADING_STATE.LOADING);

    try {
      await loginUser(userData, () => {
        setUser(userData);
        setLoadingState(LOADING_STATE.IDLE);
        callback();
      });
    } catch (error) {
      console.error(error);
      const message =
        error instanceof Error ? error.message : "Something went wrong";
      notification.warning(message);
      setLoadingState(LOADING_STATE.IDLE);
    }
  };

  const logout = (callback: VoidFunction) => {
    setUser(null);
    localStorage.removeItem(config.LOCAL_STORAGE_KEY);
    queryClient.clear();
    callback();
  };

  const value = { user, loadingState, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  return React.useContext(AuthContext);
};

export { AuthProvider, useAuth };
