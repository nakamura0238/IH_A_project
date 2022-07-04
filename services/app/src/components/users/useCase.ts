import SignupUser from "./domain/SignupUser";
import UsersEntity from "./entity";

const usersUseCase = () => {
  const signup = async (user: SignupUser) => {
    // 重複の検証
    // データベース登録
    return new UsersEntity(-1, user.email, user.email);
  };

  return { signup };
};

export default usersUseCase;
