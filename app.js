const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const mongodb = require('mongodb').MongoClient();
const userDB = require("./models/userDB");
const dotenv = require("dotenv").config();
const path = require('path');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/userDBs' )

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.post("/api/exercise/new-user/", (req,res) => {
    let username = req.body.username;
    
    userDB.findOne({"user_name": {$eq: username}}, (err, doc) => {
    if (doc) {
      return res.send('User already exists')
    }
    else{
      let newUser = new userDB({
        user_name: username
      });
      newUser.save((err, url) =>{
        res.json({
          user_name: username
        })
      });
    }
  });
});

//Listen on connection port
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port: " + port);
});










