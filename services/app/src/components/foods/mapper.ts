import { Foods, FoodsType } from "@/lib/Database/Foods";
import Exception from "@/lib/Exception";

/**
 * Foodsテーブルを操作するための機能集
 */
export namespace FoodsDB {
  /**
   *SELECTメソッド
   * @param condition 探したい条件
   * @returns 条件に当てはまる情報の配列 引数のない場合は全ての情報
   */
  export const select = async (condition?: FoodsType) => {
    return await Foods.findAll({ where: condition });
  };

  /**
   * UPDATEメソッド
   * @param oldFood 探したい条件データ
   * @param newFood 更新したいデータ
   * @returns 更新後の情報
   */
  export const update = async (oldFood: FoodsType, newFood: FoodsType) => {
    const food = await Foods.findAll({ where: oldFood });
    if (!food.length) {
      throw new Exception("Food Not Found", 404);
    }
    if (food.length > 1) {
      throw new Exception("Multiple targets found. Please narrow down to one", 404);
    }
    const target = food[0];

    if (newFood.userId) {
      target.user_id = newFood.userId;
    }
    if (newFood.iconId) {
      target.icon_id = newFood.iconId;
    }
    if (newFood.placeId) {
      target.place_id = newFood.placeId;
    }
    if (newFood.name) {
      target.name = newFood.name;
    }
    if (newFood.expirationDate) {
      target.expiration_date = newFood.expirationDate;
    }
    if (newFood.comment) {
      target.comment = newFood.comment;
    }

    const foods = await target.save();
    return foods;
  };

  /**
   * INSERTメソッド
   * @param food 登録する情報（idは入れない）
   * @returns 登録後のFoodsテーブル
   */
  export const insert = async (food: Foods) => {
    const foods = await Foods.create(food).catch(() => {
      throw new Exception("Failed Insert New Food", 404);
    });
    return foods;
  };

  /**
   * DELETE(destroy)メソッド
   * @param condition 探したい条件データ
   * @returns 成功→true、 失敗→throw new Exception
   */
  export const destroy = async (condition: FoodsType) => {
    const food = await Foods.findAll({ where: condition });
    if (!food.length) {
      throw new Exception("Food Not Found", 404);
    }
    if (food.length > 1) {
      throw new Exception("Multiple targets found. Please narrow down to one", 404);
    }
    const target = food[0];

    await target.destroy().catch(() => {
      throw new Exception("Failed Delete Food Data", 404);
    });
    return true;
  };
}
