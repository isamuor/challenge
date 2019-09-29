const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const mongoose = require('mongoose');


//Settings
require('./config');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', require('./routes/AppRoutes'));

app.use('/api/countries', require('./routes/country'));
app.use('/api/states', require('./routes/state'));
app.use('/api/cities', require('./routes/city'));
app.use('/api/clients', require('./routes/customer'));
app.use('/api/representatives', require('./routes/representatives'));


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
  });
}


app.listen(process.env.PORT, () => {
  console.log('Escuchando en el puerto' + process.env.PORT);
})

//Mongoose
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log("Conectado a la base de datos");
});

