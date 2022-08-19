import { Foods, FoodsType } from "@/lib/Database/Foods";
import Exception from "@/lib/Exception";
import { FindOptions, WhereOptions } from "sequelize";

/**
 * Foodsテーブルを操作するための機能集
 */
export namespace FoodsDB {
  /**
   *SELECTメソッド
   * @param options 探したい条件
   * @returns 条件に当てはまる情報の配列 引数のない場合は全ての情報
   */
  export const select = async (options: FindOptions) => {
    return await Foods.findAll(options);
  };

  /**
   * UPDATEメソッド
   * @param whereOptions 探したい条件データ
   * @param newFood 更新したいデータ
   * @returns 更新後の情報
   */
  export const update = async (
    whareOptions: WhereOptions,
    newFood: FoodsType
  ) => {
    const food = await Foods.findOne({ where: whareOptions });
    if (!food) {
      throw new Exception("Foods Not Found", 404);
    }
    if (newFood.userId) {
      food.user_id = newFood.userId;
    }
    if (newFood.categoryId) {
      food.category_id = newFood.categoryId;
    }
    if (newFood.placeId) {
      food.place_id = newFood.placeId;
    }
    if (newFood.name) {
      food.name = newFood.name;
    }
    if (newFood.expirationDate) {
      food.expiration_date = newFood.expirationDate;
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
    const foods = await Foods.create({
      name: food.name,
      expiration_date: food.expiration_date,
      comment: food.comment,
      category_id: food.category_id,
      place_id: food.place_id,
      user_id: food.user_id,
    }).catch((e) => {
      console.log(e);
      throw new Exception("Failed Insert New Food", 404);
    });
    return foods;
  };

  /**
   * DELETE(destroy)メソッド
   * @param whereOptions 探したい条件データ
   * @returns 成功→true、 失敗→throw new Exception
   */
  export const destroy = async (whereOptions: WhereOptions) => {
    const food = await Foods.findOne({ where: whereOptions });
    if (!food) {
      throw new Exception("Foods not Found", 404);
    }
    await food.destroy().catch(() => {
      throw new Exception("Failed Delete Food Data", 404);
    });
    return true;
  };
}
