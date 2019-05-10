const Card = require('../models/card')

class CardController {
    static findAll(req, res) {
        Card.find()
            .then(cards => {
                res.status(200).json(cards)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static create(req, res) {
        Card.create({...req.body})
            .then(newCard => {
                res.status(201).json(newCard)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static update(req, res) {
        Card.findOneAndUpdate({_id: req.params.id}, req.body, {new: true})
            .then(newCard => {
                res.status(201).json(newCard)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }

    static delete(req, res) {
        Card.findOneAndDelete({_id: req.params.id})
            .then(deletedCard => {
                res.status(201).json(deletedCard)
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    }
}

module.exports = CardController