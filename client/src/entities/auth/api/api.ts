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

export { getUser };
