const express = require('express')
const BookingController = require("../controllers/bookingController")
const { Authenticate } = require('../middleware/authentication')



const Routes = express.Router()


Routes.get('/fetchAvailability',Authenticate,BookingController.fetchAvailability)
Routes.post('/booking',Authenticate,BookingController.bookingAppointment)




module.exports = Routes
