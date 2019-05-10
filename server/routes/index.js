'use strict'
const router = require('express').Router(),
images = require('../helpers/images')
const Card = require('../models/card.js')

router.get('/', (req, res, next) => {
  res.send('Welcome to Quote Generator!')
})

router.post('/upload',
  images.saveImage,
  images.sendUploadToGCS,
  (req, res) => {
    console.log('=====',  req.file.cloudStoragePublicUrl);
    Card.create({image: req.file.cloudStoragePublicUrl})
    .then(card => {
      res.status(201).json({card})
    })
    .catch(err => {
      res.status(500).json(err.message)
    })
  })

  router.get('/cards', function(req, res) {
    Card.find({},{}, {
      sort:{
        _id: -1,
      }
    })
      .then(cards => {
        res.status(200).json(cards)
      })
      .catch(err => {
        res.status(500).json(err.message)
      })
  })

module.exports = router