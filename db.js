// essentially importing the sequelize package
const { Sequelize, /*Op, Model,*/ DataTypes } = require("sequelize");

// tellings sequelize where our database is located
const sequelize = new Sequelize({
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
});

// DATATYPES
// https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types

const User = sequelize.define('User', {
    // Model attributes are defined here
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
        // allowNull defaults to true
    },
    favColor: DataTypes.STRING,
    favDay: DataTypes.STRING
});

const Pingword = sequelize.define('Pingword', {
    userid: DataTypes.STRING,
    //serverid: DataTypes.STRING,
    pinged: {
        type: DataTypes.STRING
    }
})


module.exports = { sequelize, User, Pingword };

