import roleService from "../service/roleService";
const createFunction = async (req, res) => {
    try {
        let dataService = await roleService.createNewRoles(req.body);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log(
            "🔴>>> Error from roleController at createFunction :",
            error
        );
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
// const readFunction = async (req, res) => {
//     try {
//         //! http://localhost:8080/api/v1/user/read?page=6&limit=5
//         if (req.query.page && req.query.limit) {
//             let page = req.query.page;
//             let limit = req.query.limit;
//             let dataService = await userService.getUserWithPagination(
//                 +page,
//                 +limit
//             );
//             return res.status(200).json({
//                 errorMessage: dataService.errorMessage,
//                 errorCode: dataService.errorCode,
//                 data: dataService.data,
//             });
//         } else {
//             let dataService = await userService.getAllUser();
//             return res.status(200).json({
//                 errorMessage: dataService.errorMessage,
//                 errorCode: dataService.errorCode,
//                 data: dataService.data,
//             });
//         }
//     } catch (error) {
//         console.log("🔴>>> Error from userController at readFunction:", error);
//         return res.status(500).json({
//             errorMessage: "Error from server",
//             errorCode: -1,
//             data: "",
//         });
//     }
// };
const readFunction = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;
            let dataService = await roleService.getRolesWithPagination(
                +page,
                +limit
            );
            return res.status(200).json({
                errorMessage: dataService.errorMessage,
                errorCode: dataService.errorCode,
                data: dataService.data,
            });
        } else {
            let dataService = await roleService.getAllRoles();
            return res.status(200).json({
                errorMessage: dataService.errorMessage,
                errorCode: dataService.errorCode,
                data: dataService.data,
            });
        }
    } catch (error) {
        console.log("🔴>>> Error from roleController at readFunction :", error);
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
const updateFunction = async (req, res) => {
    try {
        let dataService = await roleService.updateRole(req.body);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log(
            "🔴>>> Error from roleController at updateFunction :",
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
        let dataService = await roleService.deleteRole(req.body.id);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log("🔴>>> Error from roleController at readFunction :", error);
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
module.exports = {
    createFunction,
    readFunction,
    deleteFunction,
    updateFunction,
};
