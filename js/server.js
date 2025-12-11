// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ====== CONFIGURACIÓN BÁSICA ======
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5500", // si probás local con Live Server
      "http://127.0.0.1:5500",
      "https://victoriajuarez244.github.io", // tu GitHub Pages
      "https://victoriajuarez244.github.io/programacionii_final",
    ],
  })
);

// ====== CONEXIÓN A MONGO ATLAS ======
if (!MONGO_URI) {
  console.error("❌ Falta la variable de entorno MONGO_URI");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ Error al conectar a MongoDB:", err.message);
    process.exit(1);
  });

// IMPORTANTE: la DB que uses en el string debe ser la que tiene la colección "portafolios"
// por ejemplo ...mongodb.net/losleones?retryWrites=true&w=majority

// ====== MODELO PORTFOLIO ======
const portfolioSchema = new mongoose.Schema(
  {
    titulo: String,
    descripcion: String,
    imagenes: [String],
  },
  {
    collection: "portafolios", // nombre exacto de la colección que tenés en Atlas
  }
);

const Portfolio = mongoose.model("Portfolio", portfolioSchema);

// ====== RUTAS ======

// Ruta simple para probar que el backend responde
app.get("/", (req, res) => {
  res.send("Backend de Los Leones funcionando 🦁");
});

// Devuelve todos los ítems de portafolio
app.get("/portfolio", async (req, res) => {
  try {
    const items = await Portfolio.find().lean();
    res.json(items);
  } catch (err) {
    console.error("❌ Error obteniendo portafolio:", err);
    res.status(500).json({ error: "Error obteniendo portafolio" });
  }
});

// ====== ARRANCAR SERVIDOR ======
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
});