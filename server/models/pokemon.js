import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
