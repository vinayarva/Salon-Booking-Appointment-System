const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Adjust path as needed

const BookAppointment = sequelize.define('bookAppointment', {
  ID: {
    type: DataTypes.INTEGER, // Can be UUID if preferred
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  time: {
    type: DataTypes.TIME, // Stores only the time
    allowNull: false
  },
  services: {
    type: DataTypes.STRING, // Use `DataTypes.JSON` or `DataTypes.TEXT` for complex service lists
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
    defaultValue: 'confirmed'
  }
},);

module.exports = BookAppointment;


// sequelize.sync({ alter: true }) // `force: true` will drop the table if it already exists
//   .then(async() => {
//     console.log('BookAppointment table created');


//     await BookAppointment.create({
//         date: '2024-11-15', // Date in YYYY-MM-DD format
//         time: '14:00:00',   // Time in HH:MM:SS format
//         customerName: 'John Doe',
//         employee: 'Mark',
//         services: ['Haircut', 'Shave'], // Will be stored as 'Haircut,Shave'
//         duration:120,
//         status: 'confirmed'
//       });
      





//   })
//   .catch(err => {
//     console.error('Error creating table:', err);
//   })



