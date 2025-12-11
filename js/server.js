const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configuración de Mongoose
mongoose.set('strictQuery', false);

// Middlewares
app.use(cors());
app.use(express.json());

// Variables de entorno
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB Atlas
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// ==== SCHEMA Y MODELO DE PORTFOLIO ==== //
const portfolioSchema = new mongoose.Schema({
    titulo: String,
    descripcion: String,
    imagenes: [String]
}, { collection: 'portafolios' });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

// ==== RUTAS ==== //

// Ruta de prueba
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Obtener todos los items del portfolio
app.get('/portfolio', async (req, res) => {
    try {
        const items = await Portfolio.find();
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