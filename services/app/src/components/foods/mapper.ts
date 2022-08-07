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
    const food = await Foods.findOne({ where: oldFood });
    if (!food) {
      throw new Exception("Foods Not Found", 404);
    }

    if (newFood.userId) {
      food.userId = newFood.userId;
    }
    if (newFood.iconId) {
      food.iconId = newFood.iconId;
    }
    if (newFood.placeId) {
      food.placeId = newFood.placeId;
    }
    if (newFood.name) {
      food.name = newFood.name;
    }
    if (newFood.expirationDate) {
      food.expirationDate = newFood.expirationDate;
    }
    if (newFood.comment) {
      food.comment = newFood.comment;
    }

    const foods = await food.save();
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
    const food = await Foods.findOne({ where: condition });
    if (!food) {
      throw new Exception("Foods not Found", 404);
    }
    await food.destroy().catch(() => {
      throw new Exception("Failed Delete Food Data", 404);
    });
    return true;
  };
}
