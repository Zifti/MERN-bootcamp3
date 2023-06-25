const express = require('express')
const router = express.Router()
const catchAsync = require('../utils/catchAsync')
const { isLoggedin,  validateDealership, isOwner } = require('../middleware/middleware')
const dealerships = require('../controllers/dealership.controller')

const multer = require('multer')
const { storage } = require('../libs/cloudinary/cloudinary.config')
const upload = multer({ storage })

router.route('/')
    .get(catchAsync(dealerships.getDealerships))
    .post(isLoggedin, upload.array('image'),  validateDealership, catchAsync(dealerships.createDealership))

router.route('/:id')
    .get(catchAsync(dealerships.showDealership))
    .put(isLoggedin, isOwner, upload.array('image'), catchAsync(dealerships.updateDealership))
    .delete(isLoggedin, isOwner,  catchAsync(dealerships.deleteDealership))

module.exports = router