const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);
let db = mongoose.connection;

let Url = require('./models/url');

// Check DB connection
db.once('open', () =>{
  console.log('connected to mongoDB');
});

// Check for DB errors
db.on('error', () =>{
  console.log(err);
});

const app = express();

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) =>{
  res.render('index');
});

app.post('/', (req, res) =>{

  var url = req.body.url;

  Url.findOne({urlAddress:url}, (err, theUrl) => {
    if(err) throw err;

    if(theUrl){
      return res.render('index', {theUrl:theUrl.shortyCode});
    }else{
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 5; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      // Check if text already exists
      let newUrl = new Url({
        urlAddress: url,
        shortyCode: text
      });

      newUrl.save((err) => {
        if(err){
          console.log(err);
          return;
        }else{
          return res.render('index', {theUrl:text});
        }

      });
    }

  });


});

app.listen(3000, () => {
  console.log('Server Started on port 3000');
});
