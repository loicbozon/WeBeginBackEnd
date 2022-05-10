const db = require("./connect.js");
const express = require('express')
let mongoose = require('mongoose');
const app = express()
const port = 3000

app.listen(port, () => {
  console.log('Server started on port ' + port);
});

let reservationSchema = mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true},
  date: {type: Date, required: true},
  phone: String,
  message: String,
});

app.get('/', (req, res) => {
  res.send('true')
});

let Reserve = mongoose.model('Reserve', reservationSchema);

app.get('/reservation', async (req, res) => { // a privilegier

  console.log(reservationSchema)

  try {
    const data = await Reserve.find({})
    res.send(reservationSchema)  
    console.log(reservationSchema)

  } catch (e) {
    console.log(e)
    res.send(e);
  }
})


app.get('/reservation', (req,res) => {
res.send("reservation en cours");
});

app.post('/reservation/', (req, res) => {
  const { name, email, phone, message, date } = req.body;
  if (!email || !name || !phone || !message || !date) {
    return res.status(400).json({
      message: 'La date de réservation, le prénom, le telephone, le message et l\'email sont demandés',
    });
  }

  const payload = {name, email, phone, message, date };
  req.collection.insertOne(payload)
    .then(result => res.json(result.ops[0]))
    .catch(error => res.send(error));
});


app.get('/reservation/:name', (req,res) => {
const name = parseInt(req.params.name)
const reservations = reservation.find(reservations => reservations.name === name)
res.status(200).json(reservations)
});


app.delete('/reservation/:id', (req, res) => {
  const { id } = req.params;
  const _id = ObjectID(id);
  req.collection.deleteOne({ _id })
    .then(result => res.json(result))
    .catch(error => res.send(error));
});
