import Serializer from "@/lib/Serializer";
import PlaceEntity from "./entity";

class PlacesSerializer extends Serializer {
    add(entity: PlaceEntity) {
        return {
            id: entity.id,
            name: entity.name
        }
    }
}

export default PlacesSerializer