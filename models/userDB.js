//Structure of database
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    user_name: String
});

const ModelClass = mongoose.model('userDB', urlSchema);

module.exports = ModelClass;
