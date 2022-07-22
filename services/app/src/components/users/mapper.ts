import Users from "@/lib/Database/Users";
import Exception from "@/lib/Exception";

/**
 * Eメールを使用して該当するユーザーの数を返すメソッド
 * @param email 検索するEメールの文字列
 * @returns 該当する件数
 */
export const count = async (email: string) => {
  let num = await Users.count({ where: { email } });
  return num;
};

/**
 * INSERTを行うメソッド
 * @param email 登録するメールアドレスの文字列
 * @param password 登録するパスワードの文字列
 * @returns Userのモデル（JSON）
 */
export const insert = async (email: string, password: string) => {
  // let result = await Users.create({ email, password });
  let [user, result] = await Users.findOrCreate({
    where: { email },
    defaults: { email, password },
  });
  if (!result) {
    throw new Exception("user already exists", 404);
  }
  return user;
};

/**
 * Eメールを使用してidを検索するメソッド
 * @param email 検索するEメールの文字列
 * @returns Userクラス
 */
export const fetchByEmail = async (email: string) => {
  let result = await Users.findOne({ where: { email } });
  if (!result) {
    throw new Exception("user not found", 404);
  }
  return result;
};
/**
 * ユーザーIDとメールアドレスで特定したユーザー情報を変更、更新するメソッド
 * ユーザーの特定に失敗した場合はユーザの未特定例外を投げる
 * @example
 * 使用例1
 * const user = await update(1, "test@example.com", "test2@example.com", "password", 123109424);
 * 使用例2：メールアドレスの変更のみ行いたい
 * const user = await update(1, "test@example.com", "test2@example.com");
 * 使用例3：メールアドレスに変更はなく、パスワードやLINE IDを変更したい
 * const user = await update(1, "test@example.com", undefined, "password", 1234567890);
 *
 * @param id ユーザーID
 * @param email 現在のメールアドレス
 * @param newEmail 登録するメールアドレス
 * @param password 登録するパスワード
 * @param lineId 登録するLINE ID
 * @returns 更新後のUserデータ
 */
export const update = async (
  id: number,
  email: string,
  newEmail?: string,
  password?: string,
  lineId?: number
) => {
  let user = await Users.findOne({ where: { id, email } });
  if (!user) {
    throw new Exception("user not found", 404);
  }
  if (newEmail) {
    user.email = newEmail;
  }
  if (password) {
    user.password = password;
  }
  if (lineId) {
    user.line_id = lineId;
  }
  return user.save();
};
