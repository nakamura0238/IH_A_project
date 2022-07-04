import Serializer from "@/lib/Serializer";
import UserEntity from "./entity";

class UsersSerializer extends Serializer {
  signup(entity: UserEntity) {
    return {
      id: entity.id,
      email: entity.email,
    };
  }

  login(entity: UserEntity, token: string) {
    return {
      id: entity.id,
      email: entity.email,
      token: token,
    };
  }
}

export default UsersSerializer;
