const mongoose = require('mongoose')



//We define the url to connect to the bd
const URL = 'mongodb://localhost/pruebas'

//We connect to the database provided
mongoose.connect(URL, { useNewUrlParser: true })
    .then(db => console.log('Connect to mongodb'))
    .catch(err => console.error(err))

module.exports = mongoose