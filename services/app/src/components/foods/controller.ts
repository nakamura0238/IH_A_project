import { NextFunction, Request, Response } from "express";
import AddFood from "./domain/AddFood";
import PutFood from "./domain/PutFood";
import FoodsSerializer from "./Serializer";
import foodsUseCase from "./useCase";

const foodsController = () => {
  const serializer = new FoodsSerializer();
  const useCase = foodsUseCase();

  const add = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の受け取り
      const food = new AddFood(req);

      // ユースケースの実行
      const result = await useCase.insert(food);

      // レスポンスの返却
      res.status(200).send(serializer.add(result));
    })().catch(next);
  };

  const list = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の受け取り
      const userId = req.user!.id;

      // ユースケースの実行
      const result = await useCase.select(userId);

      // レスポンスの返却
      res.status(200).send(serializer.list(result));
    })().catch(next);
  };

  const update = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の受け取り
      const food = new PutFood(req);

      // ユースケースの実行
      const result = await useCase.update(food);

      // レスポンスの返却
      res.status(200).send(serializer.update(result));
    })().catch(next);
  };

  const remove = (req: Request, res: Response, next: NextFunction) => {
    (async () => {
      // リクエスト内容の受け取り
      const userId = req.user!.id;
      const { foodId } = req.params;

      // ユースケースの実行
      await useCase.remove(userId, Number(foodId));

      // レスポンスの返却
      res.status(200).end();
    })().catch(next);
  };

  return { add, list, update, remove };
};

export default foodsController;
