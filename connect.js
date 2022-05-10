// connexion a la bdd

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
let cors = require('cors');
let mongoose = require('mongoose');
let jsonParser = bodyParser.json();
let db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(jsonParser);


mongoose.connect('mongodb://localhost:27017/reservation', { useNewUrlParser: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connexion à la base OK");
});

module.exports = db;