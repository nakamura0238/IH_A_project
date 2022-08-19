import Serializer from "@/lib/Serializer";
import FoodEntity from "./entity";

class FoodsSerializer extends Serializer {
  add(entity: FoodEntity) {
    const { id, name, expirationDate, comment, categoryId, placeId } = entity;
    return {
      id,
      name,
      expirationDate,
      comment,
      categoryId,
      placeId,
    };
  }

  list(entities: FoodEntity[]) {
    return {
      foods: entities.map((entity) => {
        return this.add(entity);
      }),
    };
  }

  update(entity: FoodEntity) {
    return this.add(entity);
  }
}

export default FoodsSerializer;
