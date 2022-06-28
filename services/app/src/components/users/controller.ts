import { NextFunction, Request, Response } from "express";
import UsersSerializer from "./Serializer";

const usersController = () => {
  const serializer = new UsersSerializer();

  const signup = (req: Request, res: Response, next: NextFunction) => {
    // リクエストボディの受取
    (async () => {
      // 入力内容の検証

      // 会員登録ユースケースの実行

      // レスポンスの返却
      res.status(200).send(serializer.signup());
    })().catch(next);
  };

  return { signup };
};

export default usersController;
