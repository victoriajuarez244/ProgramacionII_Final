const mongoose = require('mongoose');

const uri = "mongodb+srv://contactolosleones00_db_user:oUigxQv2oD9EGztl@cluster0.nrh9mhf.mongodb.net/losleones?retryWrites=true&w=majority";
mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));