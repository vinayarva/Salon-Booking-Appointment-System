const express = require('express')

const { Authenticate } = require('../middleware/authentication')
const ServiceController = require("../controllers/servicesController")




const Routes = express.Router()


Routes.post('/addService',Authenticate,ServiceController.createService)
Routes.get('/getService',Authenticate,ServiceController.readService)
Routes.get('/getService/:id',Authenticate,ServiceController.readServiceByID);
Routes.put('/updateService/:id', Authenticate, ServiceController.updateService);
Routes.delete('/deleteService/:id', Authenticate, ServiceController.deleteService);






module.exports = Routes
