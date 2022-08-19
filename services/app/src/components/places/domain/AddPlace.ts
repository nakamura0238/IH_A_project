import { Request } from "express";

type ReqBody = {
    name: string;
}

class AddPlace {
    private readonly _name: string;
    private readonly _user_id: number;
    
    public constructor(request: Request<{}, {}, ReqBody>) {
        const { name } = request.body;

        this._name = name;
        this._user_id = request.user!.id;
    }

    public get name() {
        return this._name;
    }

    public get userId() {
        return this._user_id
    }
}

export default AddPlace