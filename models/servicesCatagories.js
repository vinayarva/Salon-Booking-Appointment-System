const { DataTypes } = require('sequelize');
const sequelize = require('../database/db'); 

const Services = sequelize.define('services', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  serviceName: {type: DataTypes.STRING},
  serviceDescription : {type: DataTypes.TEXT},
  price: {type: DataTypes.INTEGER},
  imageLink : {type: DataTypes.TEXT}
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


