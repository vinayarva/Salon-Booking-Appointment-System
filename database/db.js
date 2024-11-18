const Sequelize = require("sequelize");

const sequelize = new Sequelize( process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: "mysql",
  host:process.env.DB_HOST,
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