import { NextFunction, Request, Response } from "express"

const placesController = () => {
    const add = (req: Request, res: Response, next: NextFunction) => {
        (async () => {
            // リクエスト内容の受け取り
            console.log(req.user)

            // 保存場所追加ユースケースの実行

            // レスポンスの返却
            res.status(200).end();
        })().catch(next)
    }
    return {
        add
    }
}

export default placesController