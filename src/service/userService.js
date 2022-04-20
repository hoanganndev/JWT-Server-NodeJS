import db from "../models"; // This file at models/index
import {
    checkEmailExist,
    checkPhoneExist,
    hasUserPassword,
} from "./checkService";
const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
        });
        if (users) {
            return {
                errorMessage: "Get all data users success !",
                errorCode: 0,
                data: users,
            };
        } else {
            return {
                errorMessage: "Get all data success !",
                errorCode: 1,
                data: [],
            };
        }
    } catch (error) {
        console.log("🔴>>> error from userService at getAllUser:", error);
        return {
            errorMessage: "Something wrong with service !",
            errorCode: -1,
            data: [],
        };
    }
};
const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: {
                model: db.Group,
                attributes: ["name", "description", "id"],
            },
            order: [["id", "DESC"]],
            offset: offset,
            limit: limit,
        });

        let totalPages = Math.ceil(count / limit); // ceil làm tròn lên
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        };
        return {
            errorMessage: "Get data with pagination success !",
            errorCode: 0,
            data: data,
        };
    } catch (error) {
        console.log(
            "🔴>>> error from userService at getUserWithPagination:",
            error
        );
        return {
            errorMessage: "Something wrong with service !",
            errorCode: -1,
            data: [],
        };
    }
};
const createNewUser = async data => {
    try {
        // check định dạng email
        // check email/phonenumber are exist
        let isEmailExist = await checkEmailExist(data.email);
        if (isEmailExist) {
            return {
                errorMessage: "The email is already exist !",
                errorCode: 1,
                data: "email",
            };
        }
        let isPhoneExist = await checkPhoneExist(data.phone);
        if (isPhoneExist) {
            return {
                errorMessage: "The phone number is already exist !",
                errorCode: 1,
                data: "phone",
            };
        }
        //🔥 hash user password
        let hashPassword = hasUserPassword(data.password);
        //🔥 hast user password
        await db.User.create({ ...data, password: hashPassword });
        return {
            errorMessage: "Create user success !",
            errorCode: 0,
            data: "",
        };
    } catch (error) {
        console.log("🔴>>> error from userService at createNewUser:", error);
        return {
            errorMessage: "Something wrong with service !",
            errorCode: -1,
            data: [],
        };
    }
};
const updateUser = async data => {
    try {
        if (!data.groupId) {
            return {
                EM: "Error with empty GroupId",
                EC: 1,
                DT: "group",
            };
        }
        let user = await db.User.findOne({
            where: { id: data.id },
        });
        if (user) {
            //🔥 Update
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
            });
            return {
                EM: "Update user success !",
                EC: 0,
                DT: "",
            };
        } else {
            //🔥 Not found user
            return {
                EM: "User not found !",
                EC: 1,
                DT: "",
            };
        }
    } catch (error) {
        console.log("🔴>>> error from userService at updateUser:", error);
        return {
            errorMessage: "Something wrong with service !",
            errorCode: -1,
            data: [],
        };
    }
};
const deleteUser = async id => {
    try {
        let user = await db.User.findOne({
            where: { id: id },
        });
        if (user) {
            await user.destroy();
            return {
                EM: "Delete user succeeds !",
                EC: 0,
                DT: "",
            };
        } else {
            return {
                EM: "User not exist !",
                EC: 1,
                DT: "",
            };
        }
    } catch (error) {
        console.log("🔴>>> error from userService at deleteUser:", error);
        return {
            errorMessage: "Something wrong with service !",
            errorCode: -1,
            data: [],
        };
    }
};
module.exports = {
    createNewUser,
    getAllUser,
    updateUser,
    deleteUser,
    getUserWithPagination,
};
