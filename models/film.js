const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    title: String,
    image: String,
    description: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

module.exports = mongoose.model('Film', FilmSchema);