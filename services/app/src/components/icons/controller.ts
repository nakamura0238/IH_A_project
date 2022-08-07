import { NextFunction, Request, Response } from "express"
import IconsSerializer from "./Serializer";

const iconsController = () => {
    const serializer = new IconsSerializer();
    
    const list = (_: Request, res: Response, next: NextFunction) => {
        (async () => {
            // TODO: データベースからアイコンの一覧を取得する
            const result = [
                {
                    id: 1,
                    category: "11",
                    image_path: "niku.png"
                },
                {
                    id: 2,
                    category: "22",
                    image_path: "yasai.png"
                }
            ]

            res.status(200).send(serializer.list(result));
        })().catch(next);
    }
    return { list }
}

export default iconsController
