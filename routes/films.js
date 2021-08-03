const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { FilmSchema } = require('../schemas.js');
const Film = require('../models/film');
const { isLoggedIn } = require('../middleware');


router.get('/', catchAsync(async (req, res) => {
    const films = await Film.find({});
    res.render('films/index', { films })
}));

router.get('/:id', catchAsync(async (req, res,) => {
    const film = await Film.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    });
    res.render('films/show', { film });
}));

module.exports = router;