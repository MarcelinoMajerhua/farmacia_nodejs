const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/farmacia'; //cambiar con el nobre del contendor de mongodb 

mongoose.connect(URI,{useUnifiedTopology: true, useNewUrlParser: true,useFindAndModify: false})//coneccion a la base de datos 
    .then(db=>console.log('conecction data base is suceful'))
    .catch(error=>console.error(error))

module.exports=mongoose;
