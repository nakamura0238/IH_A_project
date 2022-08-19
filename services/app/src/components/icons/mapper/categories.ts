import { Categories, CategoriesType } from "@/lib/Database/Categories";
import Exception from "@/lib/Exception";
import { FindOptions } from "sequelize";

export namespace CategoriesDB {

  /**
   * Selectメソッド
   * @param options 探す条件
   * @returns 条件に当てはまる情報の配列 引数のない場合は全ての情報
   */
  export const select = async (options?: FindOptions) => {
    return await Categories.findAll(options);
  }


  /**
   * UPDATEメソッド
   * @param oldCategory 探したい条件データ
   * @param newCategory 更新したいデータ
   * @returns 更新後の情報
   */

  export const update = async (oldCategory: CategoriesType, newCategory: CategoriesType) => {
    let categories = await Categories.findAll({ where: oldCategory });
    if (!categories.length) {
      throw new Exception("Category Not Found", 404);
    }
    if (categories.length > 1) {
      throw new Exception("Multiple targets found. Please narrow down to one", 404);

    }
    let target = categories[0]

    if (newCategory.id) {
      target.id = newCategory.id
    }
    if (newCategory.name) {
      target.name = newCategory.name
    }
    if (newCategory.iconId) {
      target.icon_id = newCategory.iconId
    }

    return await target.save();
  }

  /**
   * INSERTメソッド
   * @param category 登録する情報（idは入れない）
   * @returns 登録後のFoodsテーブル
   */
  export const insert = async (category: Categories) => {

    const categories = await Categories.create(category).catch(() => { throw new Exception("Failed Insert New Category") });
    return categories;
  }
  /**
   * DELETE(destroy)メソッド
   * @param condition 探したい条件データ
   * @returns 成功→true、 失敗→throw new Exception
   */
  export const destroy = async (condition: CategoriesType) => {

    const categories = await Categories.findAll({ where: condition });
    if (!categories.length) {
      throw new Exception("Category Not Found", 404);
    }

    if (categories.length > 1) {
      throw new Exception("Multiple targets found. Please narrow down to one", 404);
    }
    let target = categories[0];
    await target.destroy().catch(() => { throw new Exception("Failed Destroy Category", 404) });
    return true
  }
}
