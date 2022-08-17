import tokenVerify from "@/middlewares/tokenVerify";
import type CoreExpress from "express"
import placesController from "./controller";

const placesRouter = (express: typeof CoreExpress) => {
    const router = express.Router();
    const controller = placesController();

    router.route("/:userId/places")
        .post(tokenVerify, controller.add)
        .get(tokenVerify, controller.list)
    
    // router.route("/:userId/places/:placeId").put().delete()

    return router
}

export default placesRouter;