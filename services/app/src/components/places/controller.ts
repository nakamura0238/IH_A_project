import { NextFunction, Request, Response } from "express"
import AddPlace from "./domain/AddPlace"
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
    return {
        add
    }
}

export default placesController