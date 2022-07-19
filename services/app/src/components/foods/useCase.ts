import FoodAdd from "./domain/FoodAdd";
import FoodList from './domain/FoodList';
import FoodTrash from './domain/FoodTrash';
import FoodUpdate from './domain/FoodUpdate';
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

  return { foodList, foodAdd, foodUpdate, foodTrash };
};

export default foodsUseCase;
