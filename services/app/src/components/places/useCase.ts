import AddPlace from "./domain/AddPlace";
import PlaceEntity from "./entity";
import { PlacesDB } from "./mapper";
import { Op } from "sequelize"

const placesUseCase = () => {
    const insert = async (place: AddPlace) => {
        const registerPlace = await PlacesDB.insert(place.name, place.userId);

        return new PlaceEntity(registerPlace.id!, registerPlace.name, registerPlace.user_id)
    }    
    
    const list = async (userId: number) => {
        const places = await PlacesDB.select({
            where: {
                [Op.or]: [
                    { user_id: userId },
                    { user_id: null }
                ]
            },
            order: [
                [ "id", "ASC"]
            ]
        })

        const entities: PlaceEntity[] = [];
        places.forEach((place) => {
            entities.push(new PlaceEntity(place.id!, place.name, place.user_id))
        })
        return entities;
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