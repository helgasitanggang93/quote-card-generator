'use strict'
const router = require('express').Router(),
images = require('../helpers/images')

router.get('/', (req, res, next) => {
  res.send('Welcome to Quote Generator!')
})

router.post('/upload',
  images.saveImage,
  images.sendUploadToGCS,
  (req, res) => {
    console.log('=====',  req.file.cloudStoragePublicUrl);
        
    //nanti
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

module.exports = router