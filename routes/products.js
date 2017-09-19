const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const multer = require('multer')
const upload = multer({dest:'.public/uploads/'})

router.get('/:id/add/product',  (req, res, next)=>{
  res.render('addProduct', {placeId : req.params.id})
})
router.post('/:id/add/product',upload.single('picture'),(req, res, next)=>{
  // console.log("FORM =>", req.body)
  // console.log("PARAM =>", req.params)
  // console.log("USER =>", req.user)
  const newProduct = new Product({
    name : req.body.name,
    description: req.body.description,
    refToUser : req.user._id,
    refToPlace: req.params.id,
    picture: {
      pic_path:`/uploads/${req.file.filename}`,
      pic_name: req.file.originalname
    }
  }).save()
    .then(()=> res.redirect(`/place/${req.params.id}`))
    .catch((e)=> next(e))
  res.redirect('/map')
})

module.exports = router
