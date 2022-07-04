import Serializer from "@/lib/Serializer";
import UsersEntity from "./entity";

class UsersSerializer extends Serializer {
  signup(entity: UsersEntity) {
    return {
      id: entity.id,
      email: entity.email,
    };
  }

  login() {
    return {
      id: -1,
      email: "test@example.com",
      token: "authentication token",
    };
  }
}

export default UsersSerializer;
