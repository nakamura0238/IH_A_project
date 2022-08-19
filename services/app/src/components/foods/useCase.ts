import { Foods } from "@/lib/Database/Foods";
import { Op } from "sequelize";
import AddFood from "./domain/AddFood";
import PutFood from "./domain/PutFood";
import FoodEntity from "./entity";
import { FoodsDB } from "./mapper";

const foodsUseCase = () => {
  const insert = async (food: AddFood) => {
    const instance = Foods.build({
      name: food.name,
      expiration_date: food.expirationDate.toString(),
      comment: food.comment,
      place_id: food.placeId,
      category_id: food.categoryId,
      user_id: food.userId,
    });
    const registerFood = await FoodsDB.insert(instance);

    return new FoodEntity(
      registerFood.id!,
      registerFood.name,
      Number(registerFood.expiration_date),
      registerFood.comment,
      registerFood.place_id,
      registerFood.category_id,
      registerFood.user_id
    );
  };

  const select = async (userId: number) => {
    const foods = await FoodsDB.select({
      where: {
        user_id: userId,
      },
      order: [
        ["place_id", "ASC"],
        ["id", "ASC"],
      ],
    });

    const entities: FoodEntity[] = [];
    foods.forEach((food) => {
      const entity = new FoodEntity(
        food.id!,
        food.name,
        Number(food.expiration_date),
        food.comment,
        food.place_id,
        food.category_id,
        food.user_id
      );
      entities.push(entity);
    });
    return entities;
  };

  const update = async (food: PutFood) => {
    await FoodsDB.update(
      {
        [Op.and]: [{ id: food.id }, { user_id: food.userId }],
      },
      {
        name: food.name,
        expirationDate: food.expirationDate.toString(),
        comment: food.comment,
        placeId: food.placeId,
        categoryId: food.categoryId,
        userId: food.userId,
      }
    );

    return new FoodEntity(
      food.id,
      food.name,
      food.expirationDate,
      food.comment,
      food.placeId,
      food.categoryId,
      food.userId
    );
  };

  const remove = async (userId: number, foodId: number) => {
    await FoodsDB.destroy({
      [Op.and]: [{ id: foodId }, { user_id: userId }],
    });
  };

  return { insert, select, update, remove };
};

export default foodsUseCase;
