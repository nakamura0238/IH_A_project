import { NextFunction, Request, Response } from "express";
import SignupUser from "./domain/SignupUser";
import UsersSerializer from "./Serializer";

const usersController = () => {
  const serializer = new UsersSerializer();

  const signup = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエストの受け取り
      const signupUser = new SignupUser(req);

      // 会員登録ユースケースの実行
      console.log(signupUser);

      // レスポンスの返却
      res.status(200).send(serializer.signup());
    })().catch(next);
  };

  const login = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエストの受け取り

      // ログインユースケースの実行

      // レスポンスの返却
      res.status(200).send(serializer.login());
    })().catch(next);
  };

  return { signup, login };
};

export default usersController;
