import { NextFunction, Request, Response } from "express"
import AddPlace from "./domain/AddPlace"
import PutPlace from "./domain/PutPlace";
import PlacesSerializer from "./Serializer";
import placesUseCase from "./useCase"

const placesController = () => {
    const serializer = new PlacesSerializer();
    const useCase = placesUseCase();
    
    const add = (req: Request, res: Response, next: NextFunction) => {
        (async () => {
            // リクエスト内容の受け取り
            const addPlace = new AddPlace(req)

            // 保存場所追加ユースケースの実行
            const result = await useCase.insert(addPlace)

            // レスポンスの返却
            res.status(200).send(serializer.add(result));
        })().catch(next)
    }

    const list = (req: Request, res: Response, next: NextFunction) => {
        (async () => {
            // リクエスト内容の受け取り
            const userId = req.user!.id

            // 保存場所取得ユースケースの実行
            const result = await useCase.list(userId);

            // レスポンスの返却
            res.status(200).send(serializer.list(result));
        })().catch(next)
    }

    const put = (req: Request, res: Response, next: NextFunction) => {
        (async () => {
            // リクエスト内容の受け取り
            const putPlace = new PutPlace(req);

            // 保存場所更新ユースケースの実行
            const result = await useCase.update(putPlace);

            // レスポンスの返却
            res.status(200).send(serializer.put(result));
        })().catch(next)
    }

    const remove = (req: Request, res: Response, next: NextFunction) => {
        (async () => {
            // リクエスト内容の受け取り
            const { placeId } = req.params;
            const userId = req.user!.id

            // 食材の保存場所変更ユースケースの実行
            // 保存場所削除ユースケースの実行
            await useCase.remove(Number(placeId), userId)
        
            res.status(200).end();
        })().catch(next)
    }

    return {
        add,
        list,
        put,
        remove
    }
}

export default placesController