const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');


const Admin = sequelize.define('admin', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {type :DataTypes.STRING},
      email : {type :DataTypes.STRING},
      phone : {type :DataTypes.STRING},
      password : {type :DataTypes.STRING},
      speciality : {type :DataTypes.STRING},
      role : {type :DataTypes.STRING ,defaultValue : "staff" },
      access : {type :DataTypes.BOOLEAN,defaultValue : true}
})

module.exports =  Admin
