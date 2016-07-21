/* eslint-disable new-cap, consistent-return */

import express from 'express';
import Pokemon from '../models/pokemon';
const router = module.exports = express.Router();

// index
router.get('/', (req, res) => {
  Pokemon.find().exec((err, pokemons) => {
    res.send({ pokemons });
  });
});

// show
router.get('/:id', (req, res) => {
  Pokemon.findById(req.params.id).exec((err, pokemon) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.send({ pokemon });
  });
});

// create
router.post('/', (req, res) => {
  Pokemon.create(req.body, (err, pokemon) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.send({ pokemon });
  });
});
