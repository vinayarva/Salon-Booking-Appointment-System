const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Adjust the path as needed

const DayAvailability = sequelize.define('DayAvailability', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY, // Stores the date in `YYYY-MM-DD` format
    allowNull: false
  }
  ,
  
  availability :{
    type :DataTypes.JSON,
    allowNull: false,
    defaultValue:{
      "10:00": true,
      "11:00": true,
      "12:00": true,
      "13:00": true,
      "14:00": true,
      "15:00": true,
      "16:00": true,
      "17:00": true,
      "18:00": true
    },
    total_availability:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 540
    }
  }
}
);

module.exports = DayAvailability;


// sequelize.sync({ force:true }) // `force: true` will drop the table if it already exists
//   .then(async() => {
//     // console.log('BookAppointment table created');
//     await DayAvailability.create({
//         date: '2024-11-11',
//         employeeName: 'Mark',
//       });
      

//   })
//   .catch(err => {
//     // console.error('Error creating table:', err);
//   });

