import type CoreExpress from "express";
import foodsController from "./controller";

const foodsRouter = (express: typeof CoreExpress) => {
  const router = express.Router();
  const controller = foodsController();

  router.route("/foods").get(controller.list);
  router.route("/foods").post(controller.list);
  router.route("/foods/:id").put(controller.list);
  router.route("/foods").delete(controller.list);

  return router;
};

export default foodsRouter;