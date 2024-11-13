const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const sequelize = require('./database/db');





const DayAvailability = require('./models/dayAvailability')
const EmployeeRole =  require('./models/employeeRole');
const Services = require('./models/servicesCatagories');
const BookAppointment = require('./models/bookingAppointment');
const User = require('./models/userModel')





const routesBooking = require('./routes/routesBooking'); // Assuming routes are in a separate file
const authRoutes = require('./routes/authRoutes');
const { bookingAppointment } = require('./controllers/bookingController');


const app = express();

app.use(cors());
app.use(bodyParser.json());


app.use('/api', authRoutes);

app.use('/api', routesBooking); // Mount routes under the '/api' prefix


User.hasMany(BookAppointment)
BookAppointment.belongsTo(User)

EmployeeRole.hasMany(BookAppointment)
BookAppointment.belongsTo(EmployeeRole)

EmployeeRole.hasMany(DayAvailability)
DayAvailability.belongsTo(EmployeeRole)





sequelize
    .sync({ alter: false }) // Adjust forc to true for development, false for production
    .then(() => {
        app.listen(4000, () => {
            console.log('Server is running on http://localhost:4000/');
        });
    })
    .catch((err) => {
        console.error('Error connecting to database:', err);
    });