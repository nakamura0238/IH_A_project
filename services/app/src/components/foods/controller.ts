import {Request, Response, NextFunction } from 'express';
import FoodAdd from './domain/FoodAdd';
import FoodList from './domain/FoodList';
import FoodTrash from './domain/FoodTrash';
import FoodUpdate from './domain/FoodUpdate';
import FoodsSerializer from './Serializer';
import foodsUseCase from './useCase';

const foodsController = () => {
  const serializer = new FoodsSerializer();
  const useCase = foodsUseCase();

  //食材一覧
  const foodList = (req: Request, res: Response, next:NextFunction) => {
    (async() => {
      // リクエスト内容の受け取り
      const foodList = new FoodList(req);
      
      // 食品risutoユースケースの実行
      const result = await useCase.foodList(foodList);

      // レスポンスの返却
      res.status(200).send(serializer.foodList(result));
    })().catch(next);
  };

  //食材登録
  const foodAdd = (req: Request, res: Response, next: NextFunction) => {
    (async() => {
      // リクエスト内容の受け取り
      const foodAdd = new FoodAdd(req);

      // 食材登録ユースケースの実行
      const result = await useCase.foodAdd(foodAdd);

      // レスポンスの返却
      res.status(200).send(serializer.foodAdd(result));
    })().catch(next);
  };

  //食材更新
  const foodUpdate = (req: Request, res: Response, next: NextFunction) => {
    (async() => {
      // リクエスト内容の受け取り
      const foodUpdate = new FoodUpdate(req);

      // 食材登録ユースケースの実行
      const result = await useCase.foodUpdate(foodUpdate);

      // レスポンスの返却
      res.status(200).send(serializer.foodUpdate(result));
    })().catch(next);
  };

  //食材削除
  const foodTrash = (req: Request, res: Response, next: NextFunction) => {
    (async() => {
      // リクエスト内容の受け取り
      const foodTrash = new FoodTrash(req);

      // 食材登録ユースケースの実行
      const result = await useCase.foodTrash(foodTrash);

      // レスポンスの返却
      res.status(200).send(serializer.foodTrash(result));
    })().catch(next);
  };

  return { foodList, foodAdd, foodUpdate, foodTrash };
};

export default foodsController;