const express = require('express')
const router = express.Router()

router.get('/map', (req,res,next)=>{
  res.render('map')
})

router.post('/add/place', (req, res, next)=>{
  
})

module.exports = router
