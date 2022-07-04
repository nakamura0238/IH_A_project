import type CoreExpress from "express";
import usersController from "./controller";

const usersRouter = (express: typeof CoreExpress) => {
  const router = express.Router();
  const controller = usersController();

  router.route("/").post(controller.signup);
  router.route("/login").post(controller.login);

  return router;
};

export default usersRouter;
