import db from "../models"; // This file at models/index
import {
    checkEmailExist,
    checkPhoneExist,
    hasUserPassword,
} from "./checkService";
const createNewUser = async data => {
    try {
        // check định dạng email
        // check email/phonenumber are exist
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist === true) {
            return {
                EM: "The email is already exist !",
                EC: 1,
                DT: "email",
            };
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist === true) {
            return {
                EM: "The phonenumber is already exist !",
                EC: 1,
                DT: "phone",
            };
        }
        //🔥 hash user password
        let hashPassword = hasUserPassword(data.password);
        //🔥 hast user password
        await db.User.create({ ...data, password: hashPassword });
        return {
            EM: "Create user success !",
            EC: 0,
            DT: "",
        };
    } catch (error) {
        console.log(">>> error from userApiService:", error);
        return {
            EM: "Something wrong with service !",
            EC: -1,
            DT: [],
        };
    }
};
module.exports = {
    createNewUser,
};
