const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); // Adjust path as needed

const Services = sequelize.define('services', {
  ID: {
    type: DataTypes.INTEGER, // Can be UUID if preferred
    primaryKey: true,
    autoIncrement: true
  },
  services: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true, // Adds `createdAt` and `updatedAt` fields
  tableName: 'services'
});

module.exports = Services;

// sequelize.sync({ alter: true }) // `force: true` will drop the table if it already exists
//   .then(async() => {

//     console.log('table created');

//     const services = [
//         { services: 'Hair Cut' },
//         { services: 'Manicure' },
//         { services: 'Pedicure' },
//         { services: 'Facial' },
//         { services: 'Massage' },
//         { services: 'Hair Coloring' }
//     ];
    
//     await Services.bulkCreate(services, {
//         ignoreDuplicates: true // To prevent inserting duplicates
//     });

//   })
//   .catch(err => {
//     console.error('Error creating table:', err);
//   })


