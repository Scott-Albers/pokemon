import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model('Player', playerSchema);
