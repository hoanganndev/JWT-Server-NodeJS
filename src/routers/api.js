import express from "express";
const router = express.Router();
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkUserJWT, checkUserPermisstion } from "../middleware/JWT_Action";
const initApiRoutes = app => {
    router.all("*", checkUserJWT, checkUserPermisstion); //! Check authen and permisstion all routers
    //TODO: ROUTER REGISTER AND LOGIN
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.get("/logout", apiController.handleLogout);

    //TODO: CRUD USER ROUTER
    router.get("/user/read", userController.readFunction);
    router.post("/user/create", userController.createFunction);
    router.put("/user/update", userController.updateFunction);
    router.delete("/user/delete", userController.deleteFunction);
    router.get("/account", userController.getUserAccountFunction);
    //TODO: GROUP
    router.get("/group/read", groupController.readFunction);
    return app.use("/api/v1/", router);
};
export default initApiRoutes;
