import type CoreExpress from "express";
import foodsController from "./controller";

const foodsRouter = (express: typeof CoreExpress) => {
  const router = express.Router();
  const controller = foodsController();

  router.route("/foods/:userId").get(controller.foodList);
  router.route("/foods/:userId").post(controller.foodAdd);
  router.route("/foods/:userId/:foodId").put(controller.foodUpdate);
  router.route("/foods/:userId/:foodId").delete(controller.foodTrash);

  return router;
};

export default foodsRouter;