const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie');

/* GET home page */
router.get('/movies', (req, res, next) => {
  // console.log(req.session)
  Movie.find()
  .then((allTheMovies)=>{
    res.render('movie-views/bunchaMovies', {theMovie: allTheMovies});
      })
  .catch((err)=>{
    next(err);
  })

});


router.get('/create-movie', (req, res, next)=>{
  res.render('movie-views/newMovie');
})

router.get('/', (req, res, next)=>{
  res.render('homePage');
})


router.get('/movies/:theIdOfTheMovie', (req, res, next)=>{
  let id = req.params.theIdOfTheMovie;

  Movie.findById(id)
  .then((theMovie)=>{
    res.render('movie-views/singleMovie', {movie: theMovie})
  })
  .catch((err)=>{
    next(err);
  })
})



router.post('/create-the-movie', (req, res, next)=>{
  let theTitle = req.body.theNewMovieTitle;
  let theGenre = req.body.theNewMovieGenre;
  let thePlot = req.body.theNewMoviePlot;


  Movie.create({
    title: theTitle,
    genre: theGenre,
    plot: thePlot
  })
  .then((response)=>{
    res.redirect('/movies')
  })
  .catch((err)=>{
    next(err)
  })
})





// router.get('/books/edit/:randomVariableIMadeToHoldTheID', (req, res, next)=>{

//   Book.findById(req.params.randomVariableIMadeToHoldTheID)
//   .then((theBook)=>{

    

//     res.render('book-views/edit', {theActualBook: theBook})

//   })
//   .catch((err)=>{
//     next(err);
//   })
// })


// router.post('/books/update/:id', (req, res, next)=>{
//   let id = req.params.id;
//   id = req.body.theID;
//   // i put the ID in 2 places, you can do it either way


// // i dont want you to blindly copy this route because it is fancy
// // take a hard look at whats happening or, just cblindly copy and paste the commented code
//   // Book.findByIdAndUpdate(id, {
//   //   title: req.body.title,
//   //   author: req.body.author,
//   //   image: req.body.image
//   // })
//   let update = {...req.body};
 
  
  
//   // this stupid {new:true} thing is so that after we edit the book the response we get back shows us the new info isntead of the old info, not sure why this isnt the default
//   Book.findByIdAndUpdate(id, update, {new: true})
//   .then((response)=>{
//     console.log(response)
//     res.redirect('/books/'+id)
//   })
//   .catch((err)=>{
//     next(err)
//   })
// })



router.post('/movies/delete/:theID', (req, res, next)=>{
  Movie.findByIdAndRemove(req.params.theID)
  .then((response)=>{
    res.redirect('/movies');
  })
  .catch((err)=>{
    next(err)
  })

})



module.exports = router;