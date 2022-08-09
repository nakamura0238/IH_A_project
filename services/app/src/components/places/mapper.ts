import { Places, PlacesType } from "@/lib/Database/Places";
import Exception from "@/lib/Exception";

/**
 * Placesテーブルを操作するための機能集
 */

export namespace PlacesDB {
  /**
   *SELECTメソッド
   * @param condition 探したい条件
   * @returns 条件に当てはまる情報の配列 引数のない場合は全ての情報
   */
  export const select = async (condition?: PlacesType) => {
    return await Places.findAll({ where: condition });
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
      throw new Exception("Multiple targets found. Please narrow down to one", 404);
    }

    const place = places[0];

    if (newPlaces.name) {
      place.name = newPlaces.name;
    }
    if (newPlaces.userId) {
      place.userId = newPlaces.userId;
    }

    return await place.save();
  };
  /**
   * INSERTメソッド
   * @param place 登録する情報（idは入れない）
   * @returns 登録後のPlacesテーブル
   */
  export const insert = async (place: Places) => {
    return await Places.create(place);
  };
  /**
 * DELETE(destroy)メソッド
 * @param condition 探したい条件データ
 * @returns 成功→true、 失敗→throw new Exception
 */
  export const destroy = async (condition: PlacesType) => {
    const places = await Places.findAll({ where: condition });

    if (!places) {
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
