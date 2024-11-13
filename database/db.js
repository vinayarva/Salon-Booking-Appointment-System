const Sequelize = require("sequelize");

const sequelize = new Sequelize( 'saloon', "root", "password", {
  dialect: "mysql",
  host:"localhost" ,
});

module.exports = sequelize;



// Test the connection
// (async () => {
//     try {
//       await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     } finally {
//       await sequelize.close(); // Close the connection when done
//     }
//   })();