import { Request } from "express";
type ReqBody = {
    id: number;
    user_id: number;
}

class FoodTrash {
    private readonly _id: number;
    private readonly _user_id: number;

    public constructor(request: Request<{}, {}, ReqBody>){
        const { id, user_id } = request.body;
    
        this._id = id;
        this._user_id = user_id;
    }

    public get id() {
        return this._id;
    }

    public get user_id() {
        return this._user_id;
    }
}

export default FoodTrash;