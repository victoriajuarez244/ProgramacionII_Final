// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Mostrar variables de entorno para debug (eliminá estos logs en producción)
console.log('🔍 process.env.MONGO_URI =>', process.env.MONGO_URI);
console.log('🔍 process.env.PORT =>', process.env.PORT);

// Configuración de Mongoose
mongoose.set('strictQuery', false);

// Middlewares
app.use(cors());
app.use(express.json());

// Variables de entorno
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Validación rápida de MONGO_URI antes de intentar conectar
if (!MONGO_URI) {
  console.error('❌ MONGO_URI no está definida. Verificá tu .env o las variables de entorno en Render.');
  process.exit(1);
}

// Conexión a MongoDB Atlas
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => {
    console.error('❌ Error conectando a MongoDB:', err);
});

// ==== SCHEMA Y MODELO DE PORTFOLIO ==== //
const portfolioSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    imagenes: [String]
}, { collection: 'portfolio' }); // <-- nombre exacto de la colección en Atlas

const Portfolio = mongoose.model('Portfolio', portfolioSchema, 'portfolio');

// ==== RUTAS ==== //

// Ruta de prueba
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Obtener todos los items del portfolio (con log para debug)
app.get('/portfolio', async (req, res) => {
    try {
        console.log('🔎 GET /portfolio: consultando en Mongo...');
        const items = await Portfolio.find({});
        console.log('✅ Resultados de Portfolio.find():', items);
        res.json(items);
    } catch (err) {
        console.error('❌ Error en GET /portfolio:', err);
        res.status(500).json({ error: 'Error obteniendo el portfolio' });
    }
});

// Endpoint de debug para ver base de datos, colecciones y conteo
app.get('/debug/db', async (req, res) => {
  try {
    const dbName = mongoose.connection.db?.databaseName || 'no disponible aún';
    const collections = await mongoose.connection.db.listCollections().toArray();
    let portfolioCount = null;
    try {
      portfolioCount = await mongoose.connection.db.collection('portfolio').countDocuments();
    } catch (errInner) {
      portfolioCount = `error: ${errInner.message}`;
    }

    res.json({
      dbName,
      collections: collections.map(c => c.name),
      portfolioCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message || String(err) });
  }
});

// (Opcional) Crear nuevo item de portfolio por POST
app.post('/portfolio', async (req, res) => {
    try {
        const nuevoItem = new Portfolio(req.body);
        await nuevoItem.save();
        res.status(201).json(nuevoItem);
    } catch (err) {
        console.error('❌ Error en POST /portfolio:', err);
        res.status(400).json({ error: 'Error creando el item de portfolio' });
    }
});

// ==== INICIAR SERVIDOR ==== //
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend funcionando en puerto ${PORT}`);
});