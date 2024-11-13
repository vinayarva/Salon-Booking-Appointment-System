const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Adjust path as needed

const EmployeeRole = sequelize.define('employee_role', {
  ID: {
    type: DataTypes.INTEGER, // Can be UUID if preferred
    primaryKey: true,
    autoIncrement: true
  },
  employeeName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  specialist:{
    type :DataTypes.STRING,
    allowNull: true
  }
});

module.exports = EmployeeRole;


// sequelize.sync({ alter: true }) // `force: true` will drop the table if it already exists
//   .then(async() => {
//     console.log('table created');



//    const data = [   {employeeName:"mark",specialist:"hairCut"},
//         {employeeName:"john",specialist:"manicure"},
//         {employeeName:"finn",specialist:"pedicure"},
//         {employeeName:"angel",specialist:"facial"},
//         {employeeName:"maggie",specialist:"massage"},
//         {employeeName:"jelly",specialist:"hairColoring"}
//     ]

//     await EmployeeRole.bulkCreate(data)

//   })
//   .catch(err => {
//     console.error('Error creating table:', err);
//   })



