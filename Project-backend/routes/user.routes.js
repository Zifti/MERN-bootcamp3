const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const user = require('../controllers/user.controller')
const {validateUser} = require('../middleware/middleware')


router.route('/register')
    .post(validateUser, catchAsync(user.register))

router.route('/verify-account/:token')
    .get(catchAsync(user.verifyUser))

router.route('/forgot-password-request')
    .post(catchAsync(user.forgetPassword))

router.route('/reset-password/:token')
    .post(catchAsync(user.resetPassword))

router.route('/login')    
    .post(user.login);


module.exports = router
