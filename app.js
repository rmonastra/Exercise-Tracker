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

app.get("/api/exercise/log/", (req,res) =>{

let user = req.query.userIdGet

  userDB.findById(req.query.userIdGet, (err, doc) =>{  
    
    if(doc) {
       res.json({
          _id: doc._id,
          user_name: doc.user_name,
          exerc_desc: doc.exerc_desc,
          exerc_dura: doc.exerc_dura,
          exerc_date: doc.exerc_date
        })
    }
    else{
          res.json({
            error: "user id not found"
          })
        }
  })
})

app.post("/api/exercise/new-user/", (req,res) => {
    let username = req.body.username;
    let idUser = randomstring.generate(6);

    userDB.findOne({"user_name": {$eq: username}}, (err, doc) => {
    
    if(username === ""){
      res.json({
        error: "Username required"
      })
    }   
    else if (doc) {
      return res.send('User already exists')
    }
    else{
      let newUser = new userDB({
        user_name: username,
        _id: idUser,
        exerc_desc: "",
        exerc_dura: "",
        exerc_date: ""
      });
      newUser.save((err, url) =>{
        res.json({
          user_name: username,
          _id: idUser
        })
      });
    }
  });
});

app.post("/api/exercise/add/", (req,res) => {
    let user = req.body.userId
    
     userDB.findOne({"_id": {$eq: user}}, (err, doc) =>{

        if(doc){
          doc.exerc_desc =  req.body.description,
          doc.exerc_dura = req.body.duration,
          doc.exerc_date = req.body.date

        res.json({
          _id: doc._id,
          user_name: doc.user_name,
          exerc_desc: req.body.description,
          exerc_dura: req.body.duration,
          exerc_date: req.body.date
        })
        doc.save();
        }else{
          res.json({
            error: "user id not found"
          })
        }

});

});

//Listen on connection port
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port: " + port);
});
