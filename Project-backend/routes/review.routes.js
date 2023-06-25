const express = require('express')
const router = express.Router({ mergeParams: true })
const { validateReview, isLoggedin, isAuthor } = require('../middleware/middleware')
const reviews = require('../controllers/review.controller')
const ExpressError = require('../utils/ExpressError')
const catchAsync = require('../utils/catchAsync')

router.post('/', isLoggedin, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedin, isAuthor, catchAsync(reviews.deleteReview))

module.exports = router