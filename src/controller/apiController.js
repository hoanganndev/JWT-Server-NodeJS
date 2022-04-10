//import loginRegisterService from "../service/loginRegisterService";
// const handleRegister = async (req, res) => {
//     try {
//         let { email, phone, password } = await req.body;
//         if (!email || !phone || !password) {
//             return res.status(200).json({
//                 EM: "Missing required parameters",
//                 EC: 1,
//                 DT: "",
//             });
//         }
//         if (password && password.length < 6) {
//             return res.status(200).json({
//                 EM: "Password must have more than 6 letters",
//                 EC: 1,
//                 DT: "",
//             });
//         }
//         //🔥 service: create user
//         let data = await loginRegisterService.registerNewUser(req.body);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: "",
//         });
//     } catch (error) {
//         return res.status(500).json({
//             EM: "error from server", //error message
//             EC: -1, //error code
//             DT: "", //data
//         });
//     }
// };
// const handleLogin = async (req, res) => {
//     try {
//         let data = await loginRegisterService.handleUserLogin(req.body);
//         //🔥 set cookie
//         if (data && data.DT.access_token) {
//             res.cookie("jwt", data.DT.access_token, {
//                 httpOnly: true, // only sever can read jwt
//                 maxAge: 60 * 60 * 1000,
//             });
//         }
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT,
//         });
//     } catch (error) {
//         console.log(">>> error from controller:", error);
//         return res.status(500).json({
//             EM: "error from server", //error message
//             EC: -1, //error code
//             DT: "", //data
//         });
//     }
// };
// const handleLogout = (req, res) => {
//     try {
//         res.clearCookie("jwt");
//         return res.status(200).json({
//             EM: "clear cookie done !",
//             EC: 0,
//             DT: "",
//         });
//     } catch (error) {
//         console.log(">>> error from controller:", error);
//         return res.status(500).json({
//             EM: "error from server", //error message
//             EC: -1, //error code
//             DT: "", //data
//         });
//     }
// };
// module.exports = {
//     handleRegister,
//     handleLogin,
//     handleLogout,
// };
