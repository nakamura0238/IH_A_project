import Exception from "@/lib/Exception";
import { Request } from "express";
import { hashSync } from "bcrypt";

type ReqBody = {
  email: string;
  password: string;
};

class SignupUser {
  private readonly _email: string;
  private readonly _password: string;

  public constructor(request: Request<{}, {}, ReqBody>) {
    const { email, password } = request.body;

    // 入力内容の検証
    if (!email) throw new Exception("emailを入力してください", 422);
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
      throw new Exception("emailはメールアドレス形式で入力してください", 422);

    if (!password) throw new Exception("passwordを入力してください", 422);
    if (password.length < 3 || password.length > 255)
      throw new Exception(
        "passwordは3文字以上255文字以下で入力してください",
        422
      );
    if (!/^[A-Za-z0-9]*$/.test(password))
      throw new Exception("passwordは英数字のみが使用できます", 422);

    this._email = email;
    this._password = password;
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return hashSync(this._password, 10);
  }
}

export default SignupUser;
