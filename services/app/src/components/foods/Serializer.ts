import Serializer from "@/lib/Serializer";
import FoodEntity from "./entity";

class FoodsSerializer extends Serializer {
  foodList(entity: FoodEntity[]) {
    return {
      foods: entity
    };
  }
  foodAdd(entity: FoodEntity) {
    return {
      id: entity.id,
      user_id: entity.user_id,
      icon_id: entity.icon_id,
      place_id: entity.place_id,
      name: entity.name,
      expiration_date: entity.expiration_date,
      comment: entity.comment
    };
  }
  foodUpdate(entity: FoodEntity) {
    return {
      id: entity.id,
      user_id: entity.user_id,
      icon_id: entity.icon_id,
      place_id: entity.place_id,
      name: entity.name,
      expiration_date: entity.expiration_date,
      comment: entity.comment
    };
  }
  foodTrash(entity: FoodEntity) {
    return {
      id: entity.id,
      user_id: entity.user_id
    };
  }
}

export default FoodsSerializer;
