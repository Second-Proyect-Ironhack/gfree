const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const multer = require('multer')
const upload = multer({dest:'.public/uploads/'})

router.get('/:id/add/product',  (req, res, next)=>{
  res.render('addProduct')
})
router.post('/:id/add/product',upload.single('picture'),(req, res, next)=>{
  const newProduct = new Product({
    name : req.body.name,
    description: req.body.description,
    refToUser : req.user.name,
    refToPlace: req.params.id,
    picture: {
      pic_path:`/uploads/${req.file.filename}`,
      pic_name: req.file.originalname
    }
  }).save()
    .then(()=> res.redirect(`/place/${req.params.id}`))
    .catch((e)=> next(e))
})

module.exports = router
