const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = Schema({
    quote: String,
    image: String,
})

const Card = mongoose.Schema('Card', cardSchema)

module.exports = Card