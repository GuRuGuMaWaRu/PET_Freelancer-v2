import { rest } from "msw";

import { CONFIG } from "../../shared/const";
import { getUser, addUser, getUserByToken } from "./users";

export const userHandlers = [
  rest.post(`${CONFIG.API_URL}/users/login`, async (req, res, ctx) => {
    const { email, password }: { email: string; password: string } =
      await req.json();
    const user = getUser(email, password);

    if (!user) {
      return res(
        ctx.status(400),
        ctx.json({ status: "fail", message: "Invalid credentials" })
      );
    }

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({ status: "success", data: user })
    );
  }),
  rest.post(`${CONFIG.API_URL}/users/signup`, async (req, res, ctx) => {
    const {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
    } = await req.json();
    const user = getUser(email, password);

    if (user) {
      return res(
        ctx.status(400),
        ctx.json({ status: "fail", message: "User already exists" })
      );
    }

    addUser({ name, email, password: password });
    const newUser = getUser(email, password);

    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({ status: "success", data: newUser })
    );
  }),

  rest.get(`${CONFIG.API_URL}/users/getUser`, (req, res, ctx) => {
    // Check if the user is authenticated in this session
    const token = localStorage.getItem(CONFIG.LOCAL_STORAGE_KEY);

    if (!token) {
      // If not authenticated, respond with a 403 error
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: "Not authorized",
        })
      );
    }

    const user = getUserByToken(token);
    // If authenticated, return a mocked user details
    return res(
      ctx.status(200),
      ctx.json({
        status: "success",
        data: user,
      })
    );
  }),
];
