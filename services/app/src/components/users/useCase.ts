import LoginUser from "./domain/LoginUser";
import SignupUser from "./domain/SignupUser";
import UserEntity from "./entity";

const usersUseCase = () => {
  const signup = async (user: SignupUser) => {
    // 重複の検証
    // データベース登録
    return new UserEntity(-1, user.email);
  };

  const login = async (user: LoginUser) => {
    // ユーザーの取得
    // パスワード検証
    return new UserEntity(-1, user.email);
  };

  return { signup, login };
};

export default usersUseCase;