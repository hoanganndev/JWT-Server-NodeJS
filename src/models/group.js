"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Group extends Model {
        static associate(models) {
            // Group => User : 1.n
            // A.hasMany(B)=> foreign key being defind in the target model B
            Group.hasMany(models.User, { foreignKey: "groupId" });
            // Group => Role : n.n
            Group.belongsToMany(models.Role, {
                through: "Group_Role",
                foreignKey: "groupId",
            });
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
