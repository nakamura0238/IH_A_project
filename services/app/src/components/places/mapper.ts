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


    if (!places.length) {
      throw new Exception("Data Not Found", 404);
    }

    if (places.length > 1) {
      throw new Exception("Multiple targets found. Please narrow down to one", 404);
    }

    const place = places[0];

    if (newPlaces.name) {
      place.name = newPlaces.name;
    }
    if (newPlaces.userId) {
      place.user_id = newPlaces.userId;
    }


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

  /**
 * DELETE(destroy)メソッド
 * @param condition 探したい条件データ
 * @returns 成功→true、 失敗→throw new Exception
 */
  export const destroy = async (condition: PlacesType) => {
    const places = await Places.findAll({ where: condition });


    if (!places.length) {
      throw new Exception("Data Not Found", 404);
    }


    if (places.length > 1) {
      throw new Exception("Multiple targets found. Please narrow down to one", 404);

    }

    const place = places[0];
    await place.destroy()
      .catch(() => {
        throw new Exception("Failed Delete Data", 404);
      });
    return true
  };
}
