import loginRegisterService from "../service/loginRegisterService";
const handleRegister = async (req, res) => {
    try {
        let { email, phone, password } = await req.body;
        if (!email || !phone || !password) {
            return res.status(200).json({
                errorMessage: "Missing required parameters",
                errorCode: 1,
                data: "",
            });
        }
        if (password && password.length < 6) {
            return res.status(200).json({
                errorMessage: "Password must have more than 6 letters",
                errorCode: 1,
                data: "",
            });
        }
        //🔥 Service: Create user
        let dataService = await loginRegisterService.registerNewUser(req.body);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: "",
        });
    } catch (error) {
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            data: "",
        });
    }
};
const handleLogin = async (req, res) => {
    try {
        let dataService = await loginRegisterService.handleUserLogin(req.body);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log(">>> Error from handleLogin controller:", error);
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            errorCode: "",
        });
    }
};
// const handleLogout = (req, res) => {
//     try {
//         res.clearCookie("jwt");
//         return res.status(200).json({
//             errorMessage: "clear cookie done !",
//             errorCode: 0,
//             errorCode: "",
//         });
//     } catch (error) {
//         console.log(">>> error from controller:", error);
//         return res.status(500).json({
//             errorMessage: "error from server", //error message
//             errorCode: -1, //error code
//             errorCode: "", //data
//         });
//     }
// };
module.exports = {
    handleRegister,
    handleLogin,
    // handleLogout,
};
