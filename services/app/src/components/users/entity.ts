class UsersEntity {
  public constructor(
    public id: number,
    public email: string,
    public password: string,
    public lineId?: string
  ) {}
}

export default UsersEntity;
