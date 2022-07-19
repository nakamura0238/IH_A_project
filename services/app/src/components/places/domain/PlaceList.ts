import { Request } from "express";
type ReqBody = {
    user_id: number;
}

class PlaceList {
    private readonly _user_id: number;

    public constructor(request: Request<{}, {}, ReqBody>){
        const { user_id } = request.body;
    
        this._user_id = user_id;
    }

    public get user_id() {
        return this._user_id;
    }
}

export default PlaceList;