//Structure of database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    user_id: String,
    exerc_desc: String,
    exerc_dura: String,
    exerc_date: String
});

const ModelClass = mongoose.model('exerciseDB', urlSchema);

module.exports = ModelClass;