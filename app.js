const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

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
  console.log(req.body.url);
  res.render('index');
});

app.listen(3000, () => {
  console.log('Server Started on port 3000');
});
