import jwt from "jsonwebtoken";
//JWTの生成
//トークンの検証、作成→Expote

const SECRET_KEY = process.env.JWT_SECRET_KEY ?? "my SECRET_KEY";

/**
 * JWTtokenの生成
 * @param payload
 * @returns
 */
export const signToken = (payload: string | object | Buffer) =>{

  const token = jwt.sign(payload, SECRET_KEY);

  return token;
}

/**
 * token認証
 * @param token
 */
export const verifyToken = (token: string) =>{

  const payload = jwt.verify(token, SECRET_KEY);

  return payload;

}
