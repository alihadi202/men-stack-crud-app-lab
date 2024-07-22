
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

app.delete("/movies/:id", async (req, res, next) => {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
});

app.get("/movies/:id/edit", async (req, res) => {
    const foundMovie = await Movie.findById(req.params.id);
    console.log(foundMovie);
    res.render("movies/edit.ejs", {
        movie: foundMovie,
      });
});

app.put("/movies/:id", async (req, res) => {
    
    // Update the fruit in the database
    await Movie.findByIdAndUpdate(req.params.id, req.body);
  
    // Redirect to the fruit's show page to see the updates
    res.redirect(`/movies/${req.params.id}`);
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});