import controller from "../controllers/auth.controller.js";
import  verifySignUp from "../middlewares/verifySignUp.js";

const auth = (app) => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup,
  );

  app.post("/api/auth/signin", controller.signin);

  app.post("/api/auth/signout", controller.signout);

  app.get("/api/auth/data", [controller.requireAuth], controller.data);
};

export default auth;
