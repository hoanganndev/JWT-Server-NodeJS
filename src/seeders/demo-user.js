"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert(
            "User", // Users in migrations/create-user
            [
                {
                    email: "hoangan@gmail.com",
                    password: "123123",
                    username: "hoangan1",
                },
                {
                    email: "hoangan2@gmail.com",
                    password: "123123",
                    username: "hoangan2",
                },
                {
                    email: "hoangan3@gmail.com",
                    password: "123123",
                    username: "hoangan3",
                },
                {
                    email: "hoanga4@gmail.com",
                    password: "123123",
                    username: "hoangan4",
                },
            ],
            {}
        );
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
