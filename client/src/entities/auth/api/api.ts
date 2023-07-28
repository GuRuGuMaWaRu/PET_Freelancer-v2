import { config } from "shared/const";
import { client } from "shared/api";
import {
  ILoginFormInputs,
  IRegisterFormInputs,
  IResponseUserData,
} from "shared/types";

const getUser = async () => {
  const token = window.localStorage.getItem(config.LOCAL_STORAGE_KEY);

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

const loginUser = async (
  data: ILoginFormInputs,
  callback: (data: IResponseUserData) => void
) => {
  return client<IResponseUserData>("users/login", { data })
    .then((res) => {
      window.localStorage.setItem(config.LOCAL_STORAGE_KEY, res.data.token);
      callback(res.data);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const registerUser = async (
  data: Omit<IRegisterFormInputs, "confirmPassword">,
  callback: (data: IResponseUserData) => void
) => {
  return client<IResponseUserData>("users/signup", { data })
    .then((res) => {
      window.localStorage.setItem(config.LOCAL_STORAGE_KEY, res.data.token);
      callback(res.data);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

export { getUser, loginUser, registerUser };
