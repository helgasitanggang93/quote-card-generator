'use strict'
require('dotenv').config()

const Storage = require('@google-cloud/storage')

const CLOUD_BUCKET = process.env.CLOUD_BUCKET
console.log(process.env.KEYFILE_PATH)

const storage = Storage({
  projectId: process.env.GCLOUD_PROJECT,
  keyFilename: process.env.KEYFILE_PATH
})
const bucket = storage.bucket(CLOUD_BUCKET)

const getPublicUrl = (filename) => {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const saveImage = (req, res, next) => {
  console.log(req.body);
  
  let {image, extension} = req.body

    const base64Data = image.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,/, "");
    const newFilename = Date.now() + extension;
    const newFile = 'uploads/' + newFilename;

    fs.writeFile(newFile, base64Data, 'base64', function(err) {
      console.log(newFile);
      
      if (err) {
        console.log(err);
        res.status(500).json({
          msg: 'Internal server error',
        });
      } 
      else {
        req.imagefile = newFile
        next()
      }
    });
}

const sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  let gcsname = req.imagefile
  const file = bucket.file(gcsname)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  })

  stream.on('error', (err) => {
    console.log('ERROR nembak google ---- ', err)
    req.file.cloudStorageError = err
    next(err)
  })

  stream.on('finish', () => {
    console.log('sukses')
    req.file.cloudStorageObject = gcsname
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname)
      next()
    })
  })

  stream.end(req.file.buffer)

}

const Multer = require('multer'),
      multer = Multer({
        storage: Multer.MemoryStorage,
        limits: {
          fileSize: 5 * 1024 * 1024
        }
        // dest: '../images'
      })

module.exports = {
  getPublicUrl,
  saveImage,
  sendUploadToGCS,
  multer
}