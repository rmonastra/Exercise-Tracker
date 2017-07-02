const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const mongodb = require('mongodb').MongoClient();
const userDB = require("./models/userDB");
const dotenv = require("dotenv").config();
const path = require('path');
const randomstring = require("randomstring");

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/userdbs' )

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.post("/api/exercise/new-user/", (req,res) => {
    let username = req.body.username;
    let idUser = randomstring.generate(6);
    
    userDB.findOne({"user_name": {$eq: username}}, (err, doc) => {
    if (doc) {
      return res.send('User already exists')
    }
    else{

      let newUser = new userDB({
        user_name: username,
        user_id: idUser
      });
      newUser.save((err, url) =>{
        res.json({
          user_name: username,
          user_id: idUser
        })
      });
    }
  });
});

app.post("/api/exercise/add/", (req,res) => {
    let user = req.body.userId
   /* let exercDesc = req.body.description
    let exercDura = req.body.duration
    let exercDate = req.body.date*/

    userDB.findOne({"user_id": {$eq: user}}, (err, doc) =>{
        if(doc){
          doc.exerc_desc =  req.body.description,
          doc.exerc_dura = req.body.duration,
          doc.exerc_date = req.body.date
        }
        doc.save();
});

});

//Listen on connection port
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port: " + port);
});
