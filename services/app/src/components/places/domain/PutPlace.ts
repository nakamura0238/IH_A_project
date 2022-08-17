import { Request } from "express";

type ReqParams = {
    [key: string]: string;
}

type ReqBody = {
    id: string;
    name: string;
}

class PutPlace {
    private readonly _id: number;
    private readonly _name: string;
    private readonly _user_id: number;
    
    public constructor(request: Request<ReqParams, {}, ReqBody>) {
        const { placeId } = request.params;
        const { name } = request.body;

        this._id = Number(placeId)
        this._name = name;
        this._user_id = request.user!.id;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get userId() {
        return this._user_id
    }
}

export default PutPlace