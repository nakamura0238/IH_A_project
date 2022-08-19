import tokenVerify from "@/middlewares/tokenVerify";
import type CoreExpress from "express";
import placesController from "./controller";

const placesRouter = (express: typeof CoreExpress) => {
  const router = express.Router();
  const controller = placesController();

  router
    .route("/places")
    .post(tokenVerify, controller.add)
    .get(tokenVerify, controller.list);

  router
    .route("/places/:placeId")
    .put(tokenVerify, controller.put)
    .delete(tokenVerify, controller.remove);

  return router;
};

export default placesRouter;
