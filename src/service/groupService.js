import db from "../models"; //🔥 This file at models/index
const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [["name", "ASC"]],
        });
        return {
            errorMessage: "Get groups success !",
            errorCode: 0,
            data: data,
        };
    } catch (error) {
        console.log("🔴>>> error from groupService at getGroups:", error);
        return {
            errorMessage: "Something wrong with service !",
            errorCode: -1,
            data: [],
        };
    }
};
module.exports = {
    getGroups,
};
