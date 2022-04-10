import bcrypt from "bcryptjs";
import db from "../models";
require("dotenv").config();
//🔥 endcode and decode password with bcrypt
const salt = bcrypt.genSaltSync(10);
const hasUserPassword = userPassword => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
};
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); //🔥 true or false
};
//🔥 check exist email and phonenumber
const checkEmailExist = async userEmail => {
    let user = await db.User.findOne({
        where: { email: userEmail },
    });
    if (user) return true;
    return false;
};
const checkPhoneExist = async userPhone => {
    let user = await db.User.findOne({
        where: { phone: userPhone },
    });
    if (user) return true;
    return false;
};

module.exports = {
    hasUserPassword,
    checkEmailExist,
    checkPhoneExist,
    checkPassword,
};
