import { Users, UsersType } from "@/lib/Database/Users";
import Exception from "@/lib/Exception";

/**
 * Userテーブルを操作するための機能集
 */
export namespace UsersDB {
  /**
   *SELECTメソッド
   * @param condition 探したい条件
   * @returns 条件に当てはまる情報の配列 引数のない場合は全ての情報
   */
  export const select = async (condition?: UsersType) => {
    return await Users.findAll({ where: condition });
  };

  /**
   * UPDATEメソッド
   * @param oldUser 探したい条件データ
   * @param newUser 更新したいデータ
   * @returns 更新後の情報
   */
  export const update = async (oldUser: UsersType, newUser: UsersType) => {
    const user = await Users.findAll({ where: oldUser });
    if (!user.length) {
      throw new Exception("Users Not Found", 404);
    }
    if (user.length > 1) {
      throw new Exception("Multiple targets found. Please narrow down to one", 404);
    }
    const target = user[0];

    if (newUser.email) {
      target.email = newUser.email;
    }
    if (newUser.password) {
      target.password = newUser.password;
    }
    if (newUser.lineId) {
      target.line_id = newUser.lineId;
    }

    const users = await target.save();
    return users;
  };

  /**
   * INSERTメソッド
   * @param user 登録する情報（idは入れない）
   * @returns 登録後の情報
   */
  export const insert = async (user: UsersType) => {
    if (!user.email || !user.password) {
      throw new Exception("Argments Not Enough", 404);
    }
    const userdata = {
      id: user.id,
      email: user.email,
      password: user.password,
      line_id: user.lineId,
    };
    const [users, result] = await Users.findOrCreate({
      where: { email: user.email },
      defaults: userdata,
    });
    if (!result) {
      throw new Exception("Failed Insert Data", 404);
    }
    return users;
  };

  /**
   * DELETE(destroy)メソッド
   * @param condition 探したい条件データ
   * @returns 成功→true、 失敗→throw new Exception
   */
  export const destroy = async (condition: UsersType) => {
    const users = await Users.findAll({ where: condition });
    if (!users.length) {
      throw new Exception("Users not Found", 404);
    }
    if (users.length > 1) {
      throw new Exception("Multiple targets found. Please narrow down to one", 404);
    }
    const target = users[0];

    await target.destroy().catch(() => {
      throw new Exception("Failed Delete Data", 404);
    });
    return true;
  };

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
   * ユーザー登録を行うメソッド
   * @param email 登録するメールアドレスの文字列
   * @param password 登録するパスワードの文字列
   * @returns Userのモデル（JSON）
   */
  export const register = async (email: string, password: string) => {
    let user = await insert({ email, password });
    return user;
  };

  /**
   * Eメールを使用してidを検索するメソッド
   * @param email 検索するEメールの文字列
   * @returns Userクラス
   */
  export const fetchByEmail = async (email: string) => {
    let result = await select({ email });
    if (!result.length) {
      throw new Exception("user not found", 404);
    }
    return result;
  };

  /**
   * ユーザーIDとメールアドレスで特定したユーザー情報を変更、更新するメソッド
   * ユーザーの特定に失敗した場合はユーザの未特定例外を投げる
   * @example
   * 使用例
   * const user = await update(1, "test@example.com",{ email:"test2@example.com", password:"password", line_id:123109424});
   *
   * @param id ユーザーID
   * @param email 現在のメールアドレス
   * @param newUser 登録するデータ
   * @returns 更新後のUserデータ
   */
  export const updateByEmail = async (
    id: number,
    email: string,
    newUser: UsersType
  ) => {
    let user = await update({ id, email }, newUser);
    return user;
  };
}
