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


  const foodList = async (food: FoodList) => {

    // ユーザーの取得
    const user_id = food.user_id;

    // 時刻
    const d = new Date("2020, 1, 2, 3, 4, 4");

    // データベース一覧表示

    return [new FoodEntity(-1, food.user_id, -1, -1, 
      "ビーフ", d, "rotten")];
  };


  // 食品追加処理
  const foodAdd = async (food: FoodAdd) => {

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


    // 食材更新処理
    const foodUpdate = async (food: FoodUpdate) => {
  
      // 更新食品情報の取得
      const id = food.id;
      const user_id = food.user_id;
      const icon_id = food.icon_id;
      const place_id = food.place_id;
      const name = food.name;
      const expiration_date = food.expiration_date;
      const comment = food.comment;
  
      // データベース更新
  
      return new FoodEntity(food.id, food.user_id, food.icon_id, food.place_id, 
        food.name, food.expiration_date, food.comment);
    };


    // 食材削除処理
    const foodTrash = async (food: FoodTrash) => {
  
      // haiki食品情報の取得
      const id = food.id;
      const user_id = food.user_id;
  
      // データベース削除
  
      return new FoodEntity(food.id, food.user_id);
    };

///////////////////////////////////////////////////////////////
  // 保存場所一覧処理
  const placeList = async (food: PlaceList) => {

    // 場所一覧情報の取得
    const place_id = food.place_id;

    // データベース登録

    return new PlaceEntity(place.place_id);
  };


  // 保存場所登録処理
  const placeAdd = async (food: FoodAdd) => {

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


  // 保存場所更新処理
  const placeUpdate = async (food: FoodAdd) => {

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


  // 保存場所削除処理
  const placeTrash = async (food: FoodAdd) => {

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


  return { foodList, foodAdd, foodUpdate, foodTrash,
     placeList, placeAdd, placeUpdate, placeTrash, iconList };
};

export default foodsUseCase;
