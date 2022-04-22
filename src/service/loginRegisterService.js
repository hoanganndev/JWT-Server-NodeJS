import { Op } from "sequelize"; //🔥 operator in sequelize: toan tu
import db from "../models";
import {
    checkEmailExist,
    checkPassword,
    checkPhoneExist,
    hasUserPassword,
} from "./checkService";
require("dotenv").config();
//🔥 Handle login and register new user
const registerNewUser = async rawUserData => {
    try {
        //🔥 Check email/phone number are exist
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist) {
            return {
                errorMessage: "The email is already exist !",
                errorCode: 1,
            };
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist) {
            return {
                errorMessage: "The phone number is already exist !",
                errorCode: 1,
            };
        }
        //🔥 Hash user password
        let hashPassword = hasUserPassword(rawUserData.password);
        //🔥 Create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 3, //🔥 Default belongs to customer group
        });
        return {
            errorMessage: "A user is created successfully!",
            errorCode: 0,
        };
    } catch (error) {
        console.log("🔴>>> Error from server: ", error);
        return {
            errorMessage: "Something wrongs in service !",
            errorCode: -2,
        };
    }
};
const handleUserLogin = async rawUserData => {
    try {
        let user = await db.User.findOne({
            where: {
                //🔥 where email = valueLogin or phone = valueLogin
                [Op.or]: [
                    { email: rawUserData.valueLogin },
                    { phone: rawUserData.valueLogin },
                ],
            },
        });
        if (user) {
            console.log("🟡>>> Found user with email/phone");
            let isCorrectPassword = await checkPassword(
                rawUserData.password,
                user.password
            );
            if (isCorrectPassword) {
                return {
                    errorMessage: "ok",
                    errorCode: 0,
                };
            }
        }
        console.log(
            "🟡>>> Input value with email/phone:",
            rawUserData.valueLogin,
            "🟡>>> Password:",
            rawUserData.password
        );
        return {
            errorMessage: "Your account is incorrect",
            errorCode: 1,
            data: "",
        };
    } catch (error) {
        console.log("🔴>>> error from server: ", error);
        return {
            errorMessage: "Something wrongs in service !",
            errorCodeEC: -2,
        };
    }
};
module.exports = {
    registerNewUser,
    handleUserLogin,
};
