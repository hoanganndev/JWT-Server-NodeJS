import { Op } from "sequelize"; //! operator in sequelize: toan tu
import db from "../models";
import { createJWT } from "../middleware/JWT_Action";
import {
    checkEmailExist,
    checkPassword,
    checkPhoneExist,
    hasUserPassword,
} from "./checkService";
require("dotenv").config();
import { getGroupWithRoles } from "./JWTService";
//! Handle login and register new user
const registerNewUser = async rawUserData => {
    try {
        //! Check email/phone number are exist
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
        //! Hash user password
        let hashPassword = hasUserPassword(rawUserData.password);
        //! Create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            groupId: 4, //! Default belongs to guest group
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
                //! where email = valueLogin or phone = valueLogin
                [Op.or]: [
                    { email: rawUserData.valueLogin },
                    { phone: rawUserData.valueLogin },
                ],
            },
        });
        if (user) {
            let isCorrectPassword = await checkPassword(
                rawUserData.password,
                user.password
            );
            if (isCorrectPassword) {
                let groupWithRoles = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    username: user.username,
                    groupWithRoles,
                };
                let token = createJWT(payload);
                return {
                    errorMessage: "Login sucess !",
                    errorCode: 0,
                    data: {
                        access_token: token,
                        groupWithRoles,
                        email: user.email,
                        username: user.username,
                    },
                };
            }
        }
        return {
            errorMessage: "Your account is incorrect",
            errorCode: 1,
            data: "",
        };
    } catch (error) {
        console.log("🔴>>> Error from server: ", error);
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
