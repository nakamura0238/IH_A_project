import type CoreExpress from "express";
import iconsController from "./controller";

const iconsRouter = (express: typeof CoreExpress) => {
  const router = express.Router();
  const controller = iconsController();

  router.route("/icons").get(controller.list);

  return router;
};

export default iconsRouter;
