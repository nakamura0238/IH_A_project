import Exception from "@/lib/Exception";
import LoginUser from "./domain/LoginUser";
import SignupUser from "./domain/SignupUser";
import UserEntity from "./entity";
import { UsersDB } from "./mapper";

const usersUseCase = () => {
  const signup = async (user: SignupUser) => {
    // 重複の検証
    const count = await UsersDB.count(user.email);
    if (count >= 1) throw new Exception("そのメールアドレスはすでに登録されています", 400);

    // データベース登録
    const registerUser = await UsersDB.register(user.email, user.password);

    return new UserEntity(registerUser.id as number, registerUser.email);
  };

  const login = async (user: LoginUser) => {
    // ユーザーの取得
    const users = await UsersDB.fetchByEmail(user.email);
    const dbUser = users[0];

    // パスワード検証
    if (!user.comparePassword(dbUser.password)) throw new Exception("メールアドレスまたはパスワードが間違っています", 401)

    return new UserEntity(dbUser.id as number, user.email);
  };

  return { signup, login };
};

export default usersUseCase;
