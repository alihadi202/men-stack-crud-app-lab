
require('./config/dontev');

const express = require("express");// We begin by loading Express
const morgan = require("morgan");
const methodOverride = require("method-override");

require('./config/database');

const Movie = require("./models/movie");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan ('dev'));

// GET /
app.get("/", async (req, res , next) => {
    res.render("home.ejs");
});

app.get("/movies/new", async (req, res , next) => {
    res.render("movies/new.ejs");
});

app.post("/movies", async (req, res) => {
    console.log(req.body)
    await Movie.create(req.body);
    res.redirect("/movies/new");
});

app.get("/movies", async (req, res, next) => {
    const allmovies = await Movie.find();
    console.log(allmovies);
    res.render("movies/list.ejs", { movies: allmovies });
});

app.get("/movies/:id", async (req, res, next) => {
    const foundMovie = await Movie.findById(req.params.id);
    res.render("movies/show.ejs", { movie: foundMovie });
});

app.delete("/fruits/:fruitId", async (req, res, next) => {
    await Fruit.findByIdAndDelete(req.params.fruitId);
    res.redirect("/fruits");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});