import type CoreExpress from "express";
import foodsController from "./controller";

const foodsRouter = (express: typeof CoreExpress) => {
  const router = express.Router();
  const controller = foodsController();

  router.route("/foods/icons").get(controller.iconList);

  return router;
};

export default foodsRouter;