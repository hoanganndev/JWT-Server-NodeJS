import jwt from "jsonwebtoken";
require("dotenv").config();
const nonSecurePaths = ["/", "/login", "/logout", "/register"];
//TODO: Create a jsonwebtoken
const createJWT = payload => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        return token;
    } catch (error) {
        console.log("🔴>>> Error when create new Token from server !:", error);
    }
};
//TODO: Verify Token from client
const verifyToken = token => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log("🔴>>> Error when verify token from sever !:", error);
    }
    return decoded;
};
//TODO: Extract bearer token
const extractToken = req => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
};
//TODO: Check user jwt with cookies
const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next(); //! Don't check home,login,logout,register,
    let cookies = req.cookies;
    let tokenFromHeader = extractToken(req);
    if ((cookies && cookies.jwt) || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
        //! Verify token from client
        let decoded = verifyToken(token);
        if (decoded) {
            //! We can assign another variable with req
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                errorMessage: "Not authenticated the user, Please login !",
                errorCode: -1,
                data: "",
            });
        }
    } else {
        return res.status(401).json({
            errorMessage: "Not authenticated the user, Please login !",
            errorCode: -1,
            data: "",
        });
    }
};
//TODO: Check user permisstion
const checkUserPermisstion = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === "/account")
        return next(); //! Don't check home,login,logout,register,
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                errorMessage:
                    "You don't have the permisstion to access this resource... !",
                errorCode: -1,
                data: "",
            });
        }
        let canAccess = roles.some(item => item.url === currentUrl); //! Return true or false
        if (canAccess) {
            next();
        } else {
            return res.status(403).json({
                errorMessage:
                    "You don't have the permisstion to access this resource... !",
                errorCode: -1,
                data: "",
            });
        }
    } else {
        return res.status(401).json({
            errorMessage: "Not authenticated the user, Please login !",
            errorCode: -1,
            data: "",
        });
    }
};
module.exports = {
    createJWT,
    verifyToken,
    checkUserJWT,
    checkUserPermisstion,
};
