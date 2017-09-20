const express = require('express')
const router = express.Router()
const Place = require('../models/Place')
const Product = require('../models/Product')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/map', (req,res,next)=>{
  res.render('map', {apiKey: "AIzaSyAX6RsStZrkIKLH3c3l0ghnDzGuwrUUC9E"})
})

<<<<<<< HEAD
=======
// router.get('/place',ensureLoggedIn("/login"),(req,res, next)=>{
//   Product.find({}, (err, products) => {
//     if (err) { return next(err); }
//     })
//     console.log(products)
//   res.render('place', {
//       products: products
//     })
// })

>>>>>>> refs/remotes/origin/dev
router.get('/places', (req,res,next)=>{
  Place.find({},(err, places)=>{
    res.status(200).json(places);
  }).catch( e => res.status(500).json({error:e.message}));
})

router.post('/map', (req, res, next)=>{
  console.log(req.body)
      const newPlace= new Place({
        name: req.body.name,
        address : req.body.address,
        coordinates : {
          lat : req.body.lat,
          lng : req.body.lng
        },
        picture : req.body.picture
      }).save()
      .then(p => res.status(200).json(p))
      .catch(e => next(e))

})

router.get("/place/:id",ensureLoggedIn("/login"),(req,res,next)=>{
  Product.find({refToPlace:req.params.id})
  .then(result => {
    Place.findOne({_id:req.params.id}).then(result2=>res.render ("place" , {place:result2 ,products:result}))})



})
module.exports = router
