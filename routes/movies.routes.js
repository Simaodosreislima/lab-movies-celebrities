// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model")

// all your routes here
router.get(("/movies"), (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      res.render("movies/movies", { Movies: allMovies })
    })
})

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("movies/new-movie", { celebrities: allCelebrities })
    })
    .catch((err) => next(err));
})

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  Movie.create({ title, genre, plot, cast })
    .then((createdMovie) => {
      console.log(`Created movie is ${createdMovie.title}`);
      res.redirect("/movies")
    }).catch((err) => {
      next(err)
    })
})

router.get(("/movies/:id"), (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .populate("cast")
    .then((movieDetails) => {
      console.log(movieDetails)
      res.render("movies/movie-details", movieDetails)
    }).catch((err) => next(err))

})



module.exports = router;