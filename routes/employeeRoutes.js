const express = require('express')
const adminController = require('../controllers/adminController')
const { Authenticate } = require('../middleware/authentication')



const Routes = express.Router()


Routes.post('/admin/login',adminController.login)
Routes.post('/admin/addEmployee',Authenticate,adminController.signUp)
Routes.put('/admin/updateEmployee/:id',Authenticate,adminController.updateEmployee)
Routes.get('/admin/getEmployee',Authenticate,adminController.getEmployees)
Routes.get('/admin/editEmployee/:id',Authenticate,adminController.GetEmployeeByID)
Routes.delete('/admin/deleteEmployee/:id',Authenticate,adminController.deleteEmployee)



module.exports = Routes
