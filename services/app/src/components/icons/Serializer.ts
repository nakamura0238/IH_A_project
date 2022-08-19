import { Categories } from "@/lib/Database/Categories";
import { Icons } from "@/lib/Database/Icons";
import Serializer from "@/lib/Serializer";

class IconsSerializer extends Serializer {
    list(icons: Icons[], categories: Categories[]) {
        return {
            icons: icons.map((icon) => {
                return {
                    id: icon.id,
                    category: icon.category,
                    imagePath: icon.image_path
                }
            }),
            categories: categories.map((category) => {
                return {
                    id: category.id,
                    name: category.name,
                    iconId: category.icon_id
                }
            })
        }
    }
}

export default IconsSerializer
