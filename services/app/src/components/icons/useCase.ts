import { rejects } from 'assert';
import * as mysql from 'mysql'
import { resolve } from 'path';
import FoodAdd from "./domain/FoodAdd";
import FoodList from './domain/FoodList';
import FoodTrash from './domain/FoodTrash';
import FoodUpdate from './domain/FoodUpdate';
import PlaceList from './domain/PlaceList';
import FoodEntity from "./entity";

const foodsUseCase = () => {

  // アイコン一覧取得処理
  const iconList = async (food: FoodAdd) => {

    // 新規食品情報の取得
    const id = food.id;
    const user_id = food.user_id;
    const icon_id = food.icon_id;
    const place_id = food.place_id;
    const name = food.name;
    const expiration_date = food.expiration_date;
    const comment = food.comment;

    // データベース登録

    return new FoodEntity(food.id, food.user_id, food.icon_id, food.place_id, 
      food.name, food.expiration_date, food.comment);
  };


  return {  iconList };
};

export default foodsUseCase;
