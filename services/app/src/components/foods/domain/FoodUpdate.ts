import Exception from "@/lib/Exception";
import { Request } from "express";
type ReqBody = {
    id: number;
    user_id: number;
    icon_id: number;
    place_id: number;
    name: string;
    expiration_date: Date;
    comment: string;
}

class FoodUpdate {
    private readonly _id: number;
    private readonly _user_id: number;
    private readonly _icon_id: number;
    private readonly _place_id: number;
    private readonly _name: string;
    private readonly _expiration_date: Date;
    private readonly _comment: string;

    public constructor(request: Request<{}, {}, ReqBody>){
        const { id, user_id, icon_id, place_id, name, expiration_date, comment } = request.body;
    
        // 入力内容の検証
        if (name.length > 20)
        throw new Exception("名称は20文字以下にしてください", 422);

        const today = new Date();
        if (expiration_date < today)
            throw new Exception("消費期限が過ぎています", 422);

        if (comment != undefined && comment.length > 100)
            throw new Exception("コメントは100文字以内で入力してください。", 422);



        this._id = id;
        this._user_id = user_id;
        this._icon_id = icon_id;
        this._place_id = place_id;
        this._name = name;
        this._expiration_date = expiration_date;
        this._comment = comment;
    }

    public get id() {
        return this._id;
    }

    public get user_id() {
        return this._user_id;
    }

    public get icon_id() {
        return this._icon_id;
    }

    public get place_id() {
        return this._place_id;
    }

    public get name() {
        return this._name;
    }

    public get expiration_date() {
        return this._expiration_date;
    }
    
    public get comment() {
        return this._comment;
    }
}

export default FoodUpdate;