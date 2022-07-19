class FoodEntity {
  public constructor(
    public readonly id: number,
    public readonly user_id: number,
    public readonly icon_id?: number,
    public readonly place_id?: number,
    public readonly name?: string,
    public readonly expiration_date?: Date,
    public readonly comment?: string
  ) {}
}

export default FoodEntity;
