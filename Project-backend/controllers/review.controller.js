const Dealership = require("../models/dealership.model");
const Review = require('../models/review.model')
const jwt = require('jsonwebtoken')

module.exports.createReview = async (req, res) => {
    try{
        console.log('HERE ________' + req.body)
        const { id } = req.params
        const dealership = await Dealership.findById(id)
        console.log(req.body)
        const review = new Review(req.body)
        const token  = req.headers.authorization;
        const tokenValue = token.replace("Bearer ", "");
        const decodedToken = jwt.decode(tokenValue)
        const userId = decodedToken.id;
        review.author = userId
        dealership.reviews.push(review)
        await review.save()
        await dealership.save()
        res.status(201).json({ success: true, dealership });
   } catch {
    res.status(500).json({ error: "Something went wrong" })
   }

}

module.exports.deleteReview = async (req, res) => {
    try{
        console.log(req.params)
        const { id, reviewId } = req.params
        await Dealership.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
        await Review.findByIdAndDelete(reviewId)
        res.status(201).json({ success: true, });
    }catch{
        res.status(500).json({ error: "Something went wrong" })
    }
}