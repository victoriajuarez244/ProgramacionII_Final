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
  // Salir para que no intente conectar con undefined
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
    // Opcional: no salir automáticamente para ver logs; si preferís salir:
    // process.exit(1);
});

// ==== SCHEMA Y MODELO DE PORTFOLIO ==== //
const portfolioSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    imagenes: [String]
}, { collection: 'portfolio' }); // <-- nombre exacto de la colección en Atlas

// Forzar la colección 'portfolio' (tercer parámetro)
const Portfolio = mongoose.model('portfolio', portfolioSchema, 'portfolio');

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