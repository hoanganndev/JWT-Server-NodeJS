"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        static associate(models) {
            // //Group => User : 1.n
            // Group.hasMany(models.User);
            // //Group => Role : n.n
            // Group.belongsToMany(models.Role, {
            //     through: "Group_Role",
            //     foreignKey: "groupId",
            // });
        }
    }
    Group.init(
        {
            name: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Group",
        }
    );
    return Group;
};
