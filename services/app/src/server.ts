import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import config from "@/config";
import usersRouter from "@/components/users/router";
import errorHandling from "@/middlewares/errorHandling";
import Users from "@/lib/Database/Users";
import { fetchByEmail } from "./components/users/mapper";

const app = express();

// サーバー設定
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const options: cors.CorsOptions = {
  origin: config.server.cors.origin,
  optionsSuccessStatus: 200,
};
app.use(cors(options));

// ルーティング
app.use("/api/v1/users", usersRouter(express));
// app.use("/api/v1/foods", foodsRouter(express))

// TODO: 後で消す
app.route("/db").get((req: Request, res: Response, next: NextFunction) => {
  (async () => {
    const users = await fetchByEmail("test2@example.com");

    console.log(users);
    res.status(200).end();
  })().catch(next);
});

app.route("/db/create").get(async (req: Request, res: Response) => {
  const result = await Users.create({
    email: "test2@example.com",
    password: "Password",
  });
  console.log(result);
});
// kokomade

// エラーハンドリング
errorHandling(app);

module.exports = app;
