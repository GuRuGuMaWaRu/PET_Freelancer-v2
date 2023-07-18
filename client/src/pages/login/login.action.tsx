import { redirect } from "react-router";
import { loginUser } from "entities/auth";
import { ILoginFormInputs } from "shared/types";

const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const loginData: ILoginFormInputs = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    await loginUser(loginData);

    return redirect("/");
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "There was an error logging in. Please try again",
    };
  }
};

export { action };
