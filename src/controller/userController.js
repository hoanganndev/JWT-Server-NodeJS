import userService from "../service/userService";
//! Function read users and calculate pagination for client
const readFunction = async (req, res) => {
    try {
        //! http://localhost:8080/api/v1/user/read?page=6&limit=5
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let dataService = await userService.getUserWithPagination(
                +page,
                +limit
            );
            return res.status(200).json({
                errorMessage: dataService.errorMessage,
                errorCode: dataService.errorCode,
                data: dataService.data,
            });
        } else {
            let dataService = await userService.getAllUser();
            return res.status(200).json({
                errorMessage: dataService.errorMessage,
                errorCode: dataService.errorCode,
                data: dataService.data,
            });
        }
    } catch (error) {
        console.log("🔴>>> Error from userController at readFunction:", error);
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
//! Function create a user
const createFunction = async (req, res) => {
    try {
        let dataService = await userService.createNewUser(req.body);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log(
            "🔴>>> Error from userController at createFunction:",
            error
        );
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
//! Function update information of user
const updateFunction = async (req, res) => {
    try {
        let dataService = await userService.updateUser(req.body);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log(
            "🔴>>> Error from userController at updateFunction :",
            error
        );
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
//! Function delete a user
const deleteFunction = async (req, res) => {
    try {
        let dataService = await userService.deleteUser(req.body.id);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log(
            "🔴>>> Error from userController at deleteFunction :",
            error
        );
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
//! Function get user account
const getUserAccountFunction = async (req, res) => {
    try {
        let access_token = req.token; //! token from checkUserJWT return
        let { groupWithRoles, email, username } = req.user;
        return res.status(200).json({
            errorMessage: "Get user account sucess !",
            errorCode: 0,
            data: {
                access_token,
                groupWithRoles,
                email,
                username,
            },
        });
    } catch (error) {
        console.log(
            "🔴>>> Error from userController at deleteFunction :",
            error
        );
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
module.exports = {
    readFunction,
    createFunction,
    updateFunction,
    deleteFunction,
    getUserAccountFunction,
};
