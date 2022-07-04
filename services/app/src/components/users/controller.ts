import { NextFunction, Request, Response } from "express";
import LoginUser from "./domain/LoginUser";
import SignupUser from "./domain/SignupUser";
import UsersSerializer from "./Serializer";
import usersUseCase from "./useCase";

const usersController = () => {
  const serializer = new UsersSerializer();
  const useCase = usersUseCase();

  const signup = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の受け取り
      const signupUser = new SignupUser(req);

      // 会員登録ユースケースの実行
      const result = await useCase.signup(signupUser);

      // レスポンスの返却
      res.status(200).send(serializer.signup(result));
    })().catch(next);
  };

  const login = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の受け取り
      const loginUser = new LoginUser(req);

      // ログインユースケースの実行
      const result = await useCase.login(loginUser);
      // トークン生成
      const token = "authentication token";

      // レスポンスの返却
      res.status(200).send(serializer.login(result, token));
    })().catch(next);
  };

  return { signup, login };
};

export default usersController;
