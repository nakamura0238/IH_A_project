class FoodEntity {
  public constructor(
    public readonly id: number,
    public readonly name: string,
    public readonly expirationDate: number,
    public readonly comment: string,
    public readonly placeId: number,
    public readonly categoryId: string,
    public readonly userId: number
  ) { }
}

export default FoodEntity;
