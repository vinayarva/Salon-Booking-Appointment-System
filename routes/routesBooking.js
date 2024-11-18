const express = require('express')
const BookingController = require("../controllers/bookingController")
const { Authenticate } = require('../middleware/authentication')
const AvailabilityController =  require("../controllers/availabiltyController")



const Routes = express.Router()


Routes.get('/fetchAvailability',Authenticate,AvailabilityController.fetchAvailability)
Routes.get('/admin/fetchAvailabilityALL',Authenticate,AvailabilityController.fetchAvailabilityALL)


Routes.put('/admin/updateAvailability',Authenticate,AvailabilityController.updateAvailability)





Routes.post('/booking',Authenticate,BookingController.bookingAppointment)
Routes.get("/fetchBookings",Authenticate,BookingController.FetchUserBooking)
Routes.get("/admin/getappointment",Authenticate,BookingController.DateAppointments)
Routes.put("/admin/appointmentStatus/:id",BookingController.statusUpdater)





module.exports = Routes
