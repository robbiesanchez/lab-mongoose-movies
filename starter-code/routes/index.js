const express = require('express');
const router  = express.Router();
const Celebrity = require('../models/Celebrity');

/* GET home page */
router.get('/celebrities', (req, res, next) => {
  // console.log(req.session)
  Celebrity.find()
  .then((allTheCelebrities)=>{
    res.render('bunchaCelebrities', {theCelebrity: allTheCelebrities});
      })
  .catch((err)=>{
    next(err);
  })

});


router.get('/create', (req, res, next)=>{
  res.render('newCelebrity');
})

router.get('/', (req, res, next)=>{
  res.render('homePage');
})




router.get('/celebrities/:theIdOfTheCelebrity', (req, res, next)=>{
  let id = req.params.theIdOfTheCelebrity;

  Celebrity.findById(id)
  .then((theCelebrity)=>{
    res.render('singleCelebrity', {celebrity: theCelebrity})
  })
  .catch((err)=>{
    next(err);
  })
})



router.post('/create-the-celebrity', (req, res, next)=>{
  let theName = req.body.theNewCelebName;
  let theOccupation = req.body.theNewCelebOccupation;
  let theCatchPhrase = req.body.theNewCelebCatchPhrase;


  Celebrity.create({
    name: theName,
    occupation: theOccupation,
    catchPhrase: theCatchPhrase
  })
  .then((response)=>{
    res.redirect('/celebrities')
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



// router.post('/books/delete/:theID', (req, res, next)=>{
//   Book.findByIdAndRemove(req.params.theID)
//   .then((wnvefih)=>{
//     res.redirect('/');
//   })
//   .catch((err)=>{
//     next(err)
//   })

// })



module.exports = router;