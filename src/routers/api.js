import express from "express";
const router = express.Router();
import apiController from "../controller/apiController";

const initApiRoutes = app => {
    // //🔥 ROUTER REGISTER AND LOGIN
    // router.post("/register", apiController.handleRegister);
    // router.post("/login", apiController.handleLogin);
    // router.post("/logout", apiController.handleLogout);
    return app.use("/api/v1/", router);
};
export default initApiRoutes;
