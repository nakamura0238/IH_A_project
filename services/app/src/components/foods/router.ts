import tokenVerify from "@/middlewares/tokenVerify";
import type CoreExpress from "express";
import foodsController from "./controller";

const foodsRouter = (express: typeof CoreExpress) => {
  const router = express.Router();
  const controller = foodsController();

  router
    .route("/")
    .get(tokenVerify, controller.list)
    .post(tokenVerify, controller.add);

  router
    .route("/:foodId")
    .put(tokenVerify, controller.update)
    .delete(tokenVerify, controller.remove);

  return router;
};

export default foodsRouter;
