import express from "express";
import cors from "cors";

import config from "@/config";
import usersRouter from "@/components/users/router";
import iconsRouter from "./components/icons/router";
import errorHandling from "@/middlewares/errorHandling";
import placesRouter from "./components/places/router";
import foodsRouter from "./components/foods/router";

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

app.use("/api/v1/foods", foodsRouter(express));
app.use("/api/v1/foods", placesRouter(express));
app.use("/api/v1/foods", iconsRouter(express));

// エラーハンドリング
errorHandling(app);

module.exports = app;
