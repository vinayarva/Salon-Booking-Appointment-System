const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

require('dotenv').config();


const sequelize = require('./database/db');





const DayAvailability = require('./models/dayAvailability')

const Services = require('./models/servicesCatagories');
const BookAppointment = require('./models/bookingAppointment');
const User = require('./models/userModel')
const Admin  =  require('./models/admin')



const startCronJobs =  require("./jobs/crons")

const routesBooking = require('./routes/routesBooking'); // Assuming routes are in a separate file
const authRoutes = require('./routes/authRoutes');
// const { bookingAppointment } = require('./controllers/bookingController');
const employeeRoutes  = require("./routes/employeeRoutes")
const ServiceRoutes = require("./routes/serviceRoutes")

const app = express();

startCronJobs.startCronJobs()
startCronJobs.startCronJobs2();

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', authRoutes);
app.use('/api',employeeRoutes)

app.use('/api', routesBooking); 
app.use('/api', ServiceRoutes)



User.hasMany(BookAppointment)
BookAppointment.belongsTo(User)

Admin.hasMany(BookAppointment)
BookAppointment.belongsTo(Admin)

Admin.hasMany(DayAvailability)
DayAvailability.belongsTo(Admin)



app.use('/admin', express.static(path.join(__dirname, 'public', 'admin')));
app.use('/customer', express.static(path.join(__dirname, 'public', 'customer')));


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