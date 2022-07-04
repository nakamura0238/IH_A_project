import Serializer from "@/lib/Serializer";

class UsersSerializer extends Serializer {
  signup() {
    return {
      id: -1,
      email: "test@example.com",
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
