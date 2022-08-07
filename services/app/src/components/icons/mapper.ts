import { Icons, IconType } from "@/lib/Database/Icons";
import Exception from "@/lib/Exception";

/**
 * Iconsテーブルを操作するための機能集
 */

export namespace IconDB {
  /**
   *SELECTメソッド
   * @param condition 探したい条件
   * @returns 条件に当てはまる情報の配列 引数のない場合は全ての情報
   */
  export const select = async (condition?: IconType) => {
    return await Icons.findAll({ where: condition });
  };

  /**
   * UPDATEメソッド
   * @param oldIcon 探したい条件データ
   * @param newIcon 更新したいデータ
   * @returns 更新後の情報
   */
  export const update = async (oldIcon: IconType, newIcon: IconType) => {
    let icons = await Icons.findAll({ where: oldIcon });

    if (!icons) {
      throw new Exception("Data Not Found", 404);
    }

    if (icons.length > 1) {
      throw new Exception("Some Data Found", 404);
    }

    const icon = icons[0];

    if (newIcon.category) {
      icon.category = newIcon.category;
    }
    if (newIcon.imagePath) {
      icon.image_path = newIcon.imagePath;
    }

    return await icon.save();
  };

  /**
   * INSERTメソッド
   * @param icon 登録する情報（idは入れない）
   * @returns 登録後のIconsテーブル
   */
  export const insert = async (icon: Icons) => {
    return await Icons.create(icon);
  };
  export const destroy = async (condition: IconType) => {
    let icons = await Icons.findAll({ where: condition });

    if (!icons) {
      throw new Exception("Data Not Found", 404);
    }

    if (icons.length > 1) {
      throw new Exception("Some Data Found", 404);
    }

    const icon = icons[0];
    return icon
      .destroy()
      .then(() => {
        return true;
      })
      .catch(() => {
        throw new Exception("Failed Delete Data", 404);
      });
  };
}
