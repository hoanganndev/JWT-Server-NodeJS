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
        //! Service: Create user
        let dataService = await loginRegisterService.registerNewUser(req.body);
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: "",
        });
    } catch (error) {
        console.log("🔴>>> Error from apiController at handleRegister:", error);
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
        //! Set cookie
        if (dataService && dataService.data.access_token) {
            res.cookie("jwt", dataService.data.access_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000, //! Expire : 1h
            }); //! httpOnly: true => only server can read cookies
        }
        return res.status(200).json({
            errorMessage: dataService.errorMessage,
            errorCode: dataService.errorCode,
            data: dataService.data,
        });
    } catch (error) {
        console.log("🔴>>> Error from apiController at handleLogin:", error);
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            errorCode: "",
        });
    }
};
const handleLogout = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            errorMessage: "clear cookie done !",
            errorCode: 0,
            errorCode: "",
        });
    } catch (error) {
        console.log("🔴>>> Error from apiController at handleLogout:", error);
        return res.status(500).json({
            errorMessage: "Error from server",
            errorCode: -1,
            errorCode: "",
        });
    }
};
module.exports = {
    handleRegister,
    handleLogin,
    handleLogout,
};
