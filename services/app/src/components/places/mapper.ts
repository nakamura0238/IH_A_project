import { Places, PlacesType } from "@/lib/Database/Places";
import Exception from "@/lib/Exception";
import { FindOptions } from "sequelize";

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
   * @param oldPlaces 探したい条件データ
   * @param newPlaces 更新したいデータ
   * @returns 更新後の情報
   */
  export const update = async (
    oldPlaces: PlacesType,
    newPlaces: PlacesType
  ) => {
    let places = await Places.findAll({ where: oldPlaces });

    if (!places) {
      throw new Exception("Data Not Found", 404);
    }

    if (places.length > 1) {
      throw new Exception("Some Data Found", 404);
    }

    const place = places[0];

    if (newPlaces.name) {
      place.name = newPlaces.name;
    }
    if (newPlaces.user_id) {
      place.user_id = newPlaces.user_id;
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

  export const destroy = async (condition: PlacesType) => {
    const places = await Places.findAll({ where: condition });

    if (!places) {
      throw new Exception("Data Not Found", 404);
    }

    if (places.length > 1) {
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
