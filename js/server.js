const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// 👉 Conexión a MongoDB Atlas
const uri = "mongodb+srv://contactolosleones00_db_user:oUigxQv2oD9EGztl@cluster0.nrh9mhf.mongodb.net/losleones?retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión:', err));

// 👉 Esquema de Portfolio
const PortfolioSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagenes: [String]
});

const Portfolio = mongoose.model('Portfolio', PortfolioSchema);

// 👉 Endpoint para obtener todos los items
app.get('/portfolio', async (req, res) => {
  try {
    const items = await Portfolio.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo datos" });
  }
});

// 👉 Puerto del servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend funcionando en puerto ${PORT}`);
});


