import controller from "../controllers/room.controller.js";
import authJwt from "../middlewares/authJwt.js";

const auth = (app) => {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/room/add", [authJwt.verifyToken], controller.add);
  app.post("/api/room/join", [authJwt.verifyToken], controller.join);
  app.post("/api/room/disjoin", [authJwt.verifyToken], controller.join);
  app.get("/api/room/list", [authJwt.verifyToken], controller.list);
};

export default auth;
