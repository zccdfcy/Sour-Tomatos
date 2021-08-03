const mongoose = require('mongoose');
const Film = require('../models/film');
const movies = require('./movies')

mongoose.connect('mongodb://localhost:27017/Tomatos', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("hhh Database connected");
});

const seedDB = async () => {
    await Film.deleteMany({});
    console.log("Database clear");
    for (let i = 0; i < 5; ++i) {
        const film = new Film({
            title: `${movies[i].title}`,
            country: `${movies[i].country}`,
            description: `${movies[i].description}`,
            image: `${movies[i].image}`
        })
        await film.save();
    }

}
seedDB().then(() => {
    mongoose.connection.close();
})