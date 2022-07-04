class UserEntity {
  public constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly password?: string,
    public readonly lineId?: string
  ) {}
}

export default UserEntity;
