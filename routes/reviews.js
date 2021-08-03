const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const Film = require('../models/film');
const Review = require('../models/review');



router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const film = await Film.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    film.reviews.push(review);
    await review.save();
    await film.save();
    req.flash('success', 'Successfully created a new review!');
    res.redirect(`/films/${film._id}`);
}))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Film.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review!')
    res.redirect(`/films/${id}`);
}))

module.exports = router;