const { dealershipSchema, reviewSchema, userSchema } = require('../joiSchemas.js')
const ExpressError = require('../utils/ExpressError.js')
const Dealership = require ('../models/dealership.model.js')
const Review = require('../models/review.model.js')
const passport = require('passport')
const jwt = require('jsonwebtoken')

// Check if user is logged in using passport JWT strategy
module.exports.isLoggedin = passport.authenticate('jwt', { session: false })

// check if role is Admin
module.exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') { 
        return res.status(403).json({ error: 'You do not have permission to access this page' })
    }
    next()
}   

// check if user is the owner of the dealership  
module.exports.isOwner = async(req, res, next) => {
    const { id } = req.params
    const dealership = await Dealership.findById(id)
    const token  = req.headers.authorization;
    const tokenValue = token.replace("Bearer ", "");
    const decodedToken = jwt.decode(tokenValue)
    const userId = decodedToken.id;
    if(!dealership.owner.equals(userId) ){
        return res.status(403).json({ error: 'You do not have permission to access this page' })
    }
    next()
}


//check if user is the Author of the review 

module.exports.isAuthor = async(req, res, next) => {
    const { id, reviewId } = req.params
    const token  = req.headers.authorization;
    const tokenValue = token.replace("Bearer ", "");
    const decodedToken = jwt.decode(tokenValue)
    const userId = decodedToken.id;
    const review = await Review.findById(reviewId)
    if(!review.author.equals(userId)){
        return res.status(403).json({ error: 'You do not have permission to do that' })
    }
    next()
}


// Dealership JOI validation
module.exports.validateDealership = (req, res, next) => {
    const { error } = dealershipSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(elem => elem.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

// Review JOI validation
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(elem => elem.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}

//User JOI Validation
module.exports.validateUser = (req, res, next) => {
    const { error } = userSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(elem => elem.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next()
    }
}