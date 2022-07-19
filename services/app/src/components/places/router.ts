import type CoreExpress from "express";
import foodsController from "./controller";

const foodsRouter = (express: typeof CoreExpress) => {
  const router = express.Router();
  const controller = foodsController();
  
  router.route("/foods/:userId/places").get(controller.placeList);
  router.route("/foods/:userId/places").post(controller.placeAdd);
  router.route("/foods/:userId/places/:placeId").put(controller.placeUpdate);
  router.route("/foods/:userId/places/:placeId").delete(controller.placeTrash);

  return router;
};

export default foodsRouter;