
const sequelize = require("../database/db");
const Sequelize = require("sequelize");

const User = sequelize.define("user", {
    ID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique : true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phoneNumber:{
    type: Sequelize.STRING,
    
    allowNull:false,
  }
});

module.exports = User;