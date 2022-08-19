import { Request } from "express";

type ReqBody = {
  name: string;
  expirationDate: string;
  comment: string;
  placeId: string;
  categoryId: string;
};

class AddFood {
  private readonly _name: string;
  private readonly _expiration_date: number;
  private readonly _comment: string;
  private readonly _place_id: number;
  private readonly _category_id: string;
  private readonly _user_id: number;

  public constructor(request: Request<{}, {}, ReqBody>) {
    this._name = request.body.name;
    this._expiration_date = Number(request.body.expirationDate);
    this._comment = request.body.comment;
    this._place_id = Number(request.body.placeId);
    this._category_id = request.body.categoryId;

    this._user_id = request.user!.id;
  }

  public get name() {
    return this._name;
  }

  public get expirationDate() {
    return this._expiration_date;
  }

  public get comment() {
    return this._comment;
  }

  public get placeId() {
    return this._place_id;
  }

  public get categoryId() {
    return this._category_id;
  }

  public get userId() {
    return this._user_id;
  }
}

export default AddFood;
