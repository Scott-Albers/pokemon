/* eslint-disable new-cap, consistent-return */

import express from 'express';
import Pokemon from '../models/pokemon';
import passport from 'passport';
const router = module.exports = express.Router();
const auth = passport.authenticate('jwt', { session: false });

// index
router.get('/', auth, (req, res) => {
  Pokemon.find().exec((err, pokemons) => {
    res.send({ pokemons });
  });
});

// show
router.get('/:id', auth, (req, res) => {
  Pokemon.findById(req.params.id).exec((err, pokemon) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.send({ pokemon });
  });
});

// create
router.post('/', auth, (req, res) => {
  Pokemon.create(req.body, (err, pokemon) => {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.send({ pokemon });
  });
});
