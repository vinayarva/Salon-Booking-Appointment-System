const express = require('express')
const authController = require("../controllers/authcontroller.js")
const { Authenticate } = require('../middleware/authentication')



const Routes = express.Router()


Routes.post('/login',authController.login)
Routes.post('/signup',authController.signup)



module.exports = Routes
