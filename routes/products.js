const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const multer = require('multer')
const upload = multer({dest:'public/uploads/'})
const Place = require('../models/Place')

router.get('/place/:id/add/product/:name',  (req, res, next)=>{
  res.render('addProduct', {placeId : req.params.id, placeName : req.params.name})
})
router.post('/:id/add/product/:name',upload.single('picture'),(req, res, next)=>{
  const newProduct = new Product({
    name : req.body.name,
    description: req.body.description,
    refToUser : [],
    picture: {
      pic_path:`/uploads/${req.file.filename}`,
      pic_name: req.file.originalname
    }
})
  Place.find({name : req.params.name})
        .then((result)=>{
          const updates = {refToPlace : result.map((e)=>e._id)}
          newProduct.refToPlace = updates.refToPlace
          newProduct.save()
                    .then(res.redirect(`/place/${req.params.id}`))
})
})

router.post('/products', (req,res,next)=>{
  const productId=req.body.id
  const updates = {
        delete: req.body.delete,
      }
  if(updates.delete>=5){
    Product.findByIdAndRemove(productId, updates)
      .then( (products)=> res.status(200).json(products))
      .catch( err => res.status(500).json({err}))
  } else{

  Product.findByIdAndUpdate(productId, {$push:{refToUser : req.user._id}, $set:{delete : req.body.delete}})
    .then( (products)=> res.status(200).json(products))
    .catch( err => res.status(500).json({err}))
}
});
module.exports = router
