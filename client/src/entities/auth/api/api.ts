import { config } from "shared/const";
import { client } from "shared/api";
import { IResponseUserData } from "shared/types";

const getUser = async () => {
  const token = window.localStorage.getItem(config.localStorageKey);

  if (token) {
    const res = await client<IResponseUserData>("users/getUser").catch(
      (error) => {
        return { status: "error", data: null };
      }
    );
    return res.data;
  }

  return null;
};

const loginUser = async (data: { email: string; password: string }) => {
  return client<IResponseUserData>("users/login", { data })
    .then((res) => {
      window.localStorage.setItem(config.localStorageKey, res.data.token);
      return res.data;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export { getUser, loginUser };
