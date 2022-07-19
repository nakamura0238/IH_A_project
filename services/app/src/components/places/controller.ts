import express, {Request, Response, NextFunction } from 'express';
import FoodAdd from './domain/FoodAdd';
import FoodList from './domain/FoodList';
import FoodTrash from './domain/FoodTrash';
import FoodUpdate from './domain/FoodUpdate';
import FoodsSerializer from './Serializer';
import foodsUseCase from './useCase';

const foodsController = () => {
  const serializer = new FoodsSerializer();
  const useCase = foodsUseCase();

  //////////////////////////////////////////////////////////

  //保存場所一覧
  const placeList = (req: Request, res: Response) => {

    // レスポンスの返却
    res.status(200).send(serializer.foodList(result));
  };

  //保存場所登録
  const placeAdd = (req: Request, res: Response) => {

    // レスポンスの返却
    res.status(200).send(serializer.foodList(result));
  };

  //保存場所更新
  const placeUpdate = (req: Request, res: Response) => {

    // レスポンスの返却
    res.status(200).send(serializer.foodList(result));
  };

  //保存場所削除
  const placeTrash = (req: Request, res: Response) => {

  };

  return { placeList, placeAdd, placeUpdate, placeTrash };
};

export default foodsController;