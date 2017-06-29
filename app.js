const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongodb').MongoClient();
constuserDBDB = require("./models/userDB");
const dotenv = require("dotenv").config();
const path = require('path');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/exercise-tracks' )

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.use('/api/exercise/new-user', (req, res, next) => {
  const userDB_name = req.body.user_name
userDB.find({user_name}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      if (result.length === 0) {
        next();
      } else {
        res.send('duplicateuserDB_name not allowed');
      }
    }
  })
})

app.use('/api/exercise/log', (req,res,next) => {
  constuserDB_id = req.query.useruser_id;
userDBDBDB.findById({user_id}, (err, result) => {
    if(err) {
      res.send('User not found');
    } else {
      next();
    }
  })
})

app.get('/', (req,res) => {
  res.render('index');
})

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'favicon.ico'));
});

app.get('/api/exercise/log', (req,res) => {
  constuserDBuser_id = req.query.useruser_id
  const from = exerc_dateToNumber(req.query.from) || 0;
  const to = exerc_dateToNumber(req.query.to) || 99999999;
  const limit = (Math.abs(0 - (req.query.limit || 0)));
  Exercise.find({
  userDBDBuser_id,
    exerc_date: {$gt: from, $lt: to},
  }, {}, {limit}, (err,result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
})

app.post('/api/exercise/new-user', (req,res) => {
  constuserDB_name = req.body.user_name;
userDBDBDB.create({user_name}, (err,user) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  })
})

app.post('/api/exercise/add', (req,res) => {
  let {user_id, exerc_desc, exerc_dura, exerc_date} = req.body;
  exerc_date = exerc_dateToNumber(exerc_date);
userDBDB.findById(user_id, (err,userDB) => {
    if (err) {
      res.send('user ID not found')
    } else {
      Exercise.create({useruser_id:userDB_id,userDB_name:userDB.user_name, exerc_desc, exerc_dura, exerc_date}, (err, exercise) => {
        if (err) {
          res.send(err);
        } else {
          res.send(`{"useruser_id": "${user_id}", "user_name": "${user.user_name}", "exerc_desc": "${exerc_desc}", "exerc_dura": "${exerc_dura}", "exerc_date": "${exerc_dateFromNumber(exerc_date)}"}`);
        }
      })
    }
  })
})

//Listen on connection port
let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening on port: " + port);
});
