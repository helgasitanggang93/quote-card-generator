'use strict'
const router = require('express').Router(),
images = require('../helpers/images')

router.get('/', (req, res, next) => {
  res.send('Welcome to Quote Generator!')
})
router.post('/upload',
  images.multer.single(['image']), 
  images.sendUploadToGCS,
  (req, res) => {
    res.send({
      status: 200,
      message: 'Your file is successfully uploaded',
      link: req.file.cloudStoragePublicUrl
    })
  })

module.exports = router