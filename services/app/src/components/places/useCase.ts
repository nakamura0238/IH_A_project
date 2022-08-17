import AddPlace from "./domain/AddPlace";
import PlaceEntity from "./entity";
import { PlacesDB } from "./mapper";

const placesUseCase = () => {
    const insert = async (place: AddPlace) => {
        const registerPlace = await PlacesDB.insert(place.name, place.userId);

        return new PlaceEntity(registerPlace.id!, registerPlace.name, registerPlace.user_id)
    }    
    
    const list = async () => {

    }  
    
    const update = async () => {

    }    

    const remove = async () => {

    }

    return {
        insert,
        list,
        update,
        remove,
    }
}

export default placesUseCase