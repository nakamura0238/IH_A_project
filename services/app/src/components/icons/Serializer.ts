import Serializer from "@/lib/Serializer";
import { toCamelCaseObject } from "@/lib/util";

class IconsSerializer extends Serializer {
    list(icons: any[]) {
        // TODO: anyを変更
        return {
            icons: toCamelCaseObject(icons)
        }
    }
}

export default IconsSerializer
