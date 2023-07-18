import { getUser } from "entities/auth";
import { redirect } from "react-router";
import { IResponseUserData } from "shared/types";

const loader = async (): Promise<IResponseUserData | null> => {
  const user = await getUser();

  if (!user) {
    throw redirect("/auth");
  }

  return user;
};

export { loader };
