const express = require('express')
const BookingController = require("../controllers/bookingController")
const { Authenticate } = require('../middleware/authentication')
const AvailabilityController =  require("../controllers/availabiltyController")
const paymentController = require('../controllers/purchaseController')



const Routes = express.Router()


Routes.get('/fetchAvailability',Authenticate,AvailabilityController.fetchAvailability)
Routes.get('/admin/fetchAvailabilityALL',Authenticate,AvailabilityController.fetchAvailabilityALL)


Routes.put('/admin/updateAvailability',Authenticate,AvailabilityController.updateAvailability)


Routes.put('/updateBooking/:id',Authenticate,BookingController.updateBookingByID)


Routes.post('/booking',Authenticate,BookingController.bookingAppointment)
Routes.get("/fetchBookings",Authenticate,BookingController.FetchUserBooking)
Routes.get("/admin/getappointment",Authenticate,BookingController.DateAppointments)
Routes.put("/admin/appointmentStatus/:id",BookingController.statusUpdater)



Routes.get("/service/premium",Authenticate,paymentController.premiumPurchase)

Routes.post("/service/verify",Authenticate,paymentController.verify)





module.exports = Routes
