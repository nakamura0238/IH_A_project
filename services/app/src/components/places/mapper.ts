import { Places } from "@/lib/Database/Places";
import Exception from "@/lib/Exception";
import { FindOptions, WhereOptions } from "sequelize";

/**
 * Placesテーブルを操作するための機能集
 */

export namespace PlacesDB {
  /**
   *SELECTメソッド
   * @param condition 探したい条件
   * @returns 条件に当てはまる情報の配列 引数のない場合は全ての情報
   */
  export const select = async (findOptions: FindOptions) => {
    return await Places.findAll(findOptions);
  };

  /**
   * UPDATEメソッド
   * @param whereOptions
   * @param name
   * @returns 更新後の情報
   */
  export const update = async (
    whereOptions: WhereOptions,
    name: string,
  ) => {
    const places = await Places.findAll({
      where: whereOptions
    })

    if (!places || places.length < 1) throw new Exception("Data Not Found", 404);

    const place = places[0];
    place.name = name

    return await place.save();
  };
  /**
   * INSERTメソッド
   * @param name
   * @param userId
   * @returns 登録後のPlacesテーブル
   */
  export const insert = async (name: string, userId: number) => {
    return await Places.create({
      name,
      user_id: userId
    });
  };

  export const destroy = async (whereOptions: WhereOptions) => {
    const places = await Places.findAll({ where: whereOptions });

    if (!places) {
      throw new Exception("Data Not Found", 404);
    }

    if (places.length < 1) {
      throw new Exception("Some Data Found", 404);
    }

    const place = places[0];
    place
      .destroy()
      .then(() => {
        return true;
      })
      .catch(() => {
        throw new Exception("Failed Delete Data", 404);
      });
  };
}
