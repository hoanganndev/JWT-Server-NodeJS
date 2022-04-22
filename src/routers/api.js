import express from "express";
const router = express.Router();
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
const initApiRoutes = app => {
    //🔥 ROUTER REGISTER AND LOGIN
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    // router.post("/logout", apiController.handleLogout);
    //🔥 CRUD USER ROUTER
    router.get("/user/read", userController.readFunction);
    router.post("/user/create", userController.createFunction);
    router.put("/user/update", userController.updateFunction);
    router.delete("/user/delete", userController.deleteFunction);
    //🔥 GROUP
    router.get("/group/read", groupController.readFunction);
    return app.use("/api/v1/", router);
};
export default initApiRoutes;
