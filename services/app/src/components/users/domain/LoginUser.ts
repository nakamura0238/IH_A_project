import { compareSync } from "bcrypt";
import { Request } from "express";

type ReqBody = {
  email: string;
  password: string;
};

class LoginUser {
  private readonly _email: string;
  private readonly _password: string;

  public constructor(request: Request<{}, {}, ReqBody>) {
    const { email, password } = request.body;

    this._email = email;
    this._password = password;
  }

  public get email() {
    return this._email;
  }

  public get password() {
    return this._password;
  }

  public comparePassword(encrypted: string) {
    return compareSync(this._password, encrypted)
  }
}

export default LoginUser;
