require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const index = require('./routes')

app.use(express.urlencoded({limit: '50mb', extended: false}))
app.use(express.json({limit: '50mb'}))
app.use(cors())

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true})

app.use('/', index)

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    app.listen(process.env.PORT, () => {
        console.log(`starting port ${process.env.PORT}`);
    })
});
