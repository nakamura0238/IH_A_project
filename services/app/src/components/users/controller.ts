import { NextFunction, Request, Response } from "express";
import UsersSerializer from "./Serializer";

const usersController = () => {
  const serializer = new UsersSerializer();

  const signup = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエストボディの受取
      // 入力内容の検証

      // 会員登録ユースケースの実行

      // レスポンスの返却
      res.status(200).send(serializer.signup());
    })().catch(next);
  };

  const login = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエストボディの受取
      // 入力内容の検証

      // ログインユースケースの実行

      // レスポンスの返却
      res.status(200).send(serializer.login());
    })().catch(next);
  };

  return { signup, login };
};

export default usersController;
