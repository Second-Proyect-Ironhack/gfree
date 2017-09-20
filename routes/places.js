const express = require('express')
const router = express.Router()
const Place = require('../models/Place')
const Product = require('../models/Product')
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/map', (req,res,next)=>{
  res.render('map')
})

router.get('/place',ensureLoggedIn("/login"),(req,res, next)=>{
  Product.find({}, (err, products) => {
    if (err) { return next(err); }
    })
    console.log(products)
  res.render('place', {
      products: products
    })
})

router.get('/places', (req,res,next)=>{
  Place.find({},(err, places)=>{
    res.status(200).json(places);
  }).catch( e => res.status(500).json({error:e.message}));
})

// router.post('/add/place',ensureLoggedIn("/login"), (req, res, next)=>{
//   console.log(req.body.address)
//   Place.findOne({"address": req.body.address},(err, place)=>{
//     if(place !== null){
//       res.redirect("/map",{err: "that place is already defined"})
//       return
//     }
//     const newPlace= new Place({
//       name: req.body.name,
//       address : req.body.address,
//       refToUser: req.user._id,
//       coordinates : {
//         lat : req.body.lat,
//         lng : req.body.lng
//       },
//       picture : req.body.picture
//     }).save().then((p)=>{
//       console.log(p)
//       res.redirect(`/place/${p._id}`)})
//     .catch((e)=> next(e))
//   })
// })
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
