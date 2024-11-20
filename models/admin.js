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


// Seed predefined user before syncing the database
Admin.beforeSync(async () => {
  const predefinedUser = {
      name: "Admin User",
      email: "admin@gmail.com",
      phone: "143",
      password: `$2b$10$vbfLI9RLFOuzIwQED2hVr.X9h4q3/ENG1SjLLafxnx17uYCECFH0a`, // Hash the password before inserting
      speciality: "General",
      role: "admin",
      access: true
  };

  const existingUser = await Admin.findOne({ where: { email: predefinedUser.email } });
  if (!existingUser) {
      await Admin.create(predefinedUser);
  }
});





module.exports =  Admin
