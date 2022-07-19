import PlaceAdd from "./domain/PlaceAdd";
import PlaceList from './domain/PlaceList';
import PlaceTrash from './domain/PlaceTrash';
import PlaceUpdate from './domain/PlaceUpdate';
import PlaceEntity from "./entity";

const PlacesUseCase = () => {


  const PlaceList = async (place: PlaceList) => {

    // ユーザーの取得
    const user_id = place.user_id;

    // データベース一覧表示


    return [new PlaceEntity(-1, place.user_id, -1, -1)];
  };


  // 場所追加処理
  const PlaceAdd = async (place: PlaceAdd) => {

    // 新規場所情報の取得
    const id = place.id;
    const place_id = place.place_id;
    const icon_id = place.icon_id;
    const place_id = place.place_id;
    const name = place.name;

    // データベース登録


    return new PlaceEntity(place.id, place.place_id, place.icon_id, place.place_id, 
      place.name, place.expiration_date, place.comment);
    };


    // 場所更新処理
    const PlaceUpdate = async (place: PlaceUpdate) => {
  
      // 更新場所情報の取得
      const id = place.id;
      const place_id = place.place_id;
      const icon_id = place.icon_id;
      const place_id = place.place_id;
      const name = place.name;
      const expiration_date = place.expiration_date;
      const comment = place.comment;
  
      // データベース更新
  

      return new PlaceEntity(place.id, place.place_id, place.icon_id, place.place_id, 
        place.name, place.expiration_date, place.comment);
    };


    // 場所削除処理
    const PlaceTrash = async (place: PlaceTrash) => {
  
      // 廃棄する場所情報の取得
      const id = place.id;
      const place_id = place.place_id;
  
      // データベース削除

      
      return new PlaceEntity(place.id, place.place_id);
    };

  return { PlaceList, PlaceAdd, PlaceUpdate, PlaceTrash };
};

export default PlacesUseCase;
