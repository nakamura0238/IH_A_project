import { NextFunction, Request, Response } from "express"
import { CategoriesDB } from "./mapper/categories";
import { IconDB } from "./mapper/icons";
import IconsSerializer from "./Serializer";

const iconsController = () => {
    const serializer = new IconsSerializer();

    const list = (_: Request, res: Response, next: NextFunction) => {
        (async () => {
            const icons = await IconDB.select();

            const categories = await CategoriesDB.select({
                order: [
                    ["icon_id", "ASC"]
                ]
            });

            res.status(200).send(serializer.list(icons, categories));
        })().catch(next);
    }
    return { list }
}

export default iconsController
