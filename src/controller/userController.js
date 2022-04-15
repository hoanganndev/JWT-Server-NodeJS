import userService from "../service/userService";
const readFunction = async (req, res) => {
    try {
        let dataService = await userService.getAllUser();
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log("🔴>>> Error from userController at readFunction :", error);
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
const createFunction = async (req, res) => {
    try {
    } catch (error) {
        console.log(
            "🔴>>> Error from userController at createFunction :",
            error
        );
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
const updateFunction = async (req, res) => {
    try {
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
const deleteFunction = async (req, res) => {
    try {
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
};
