const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configuration CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://bookmanager-eta.vercel.app', 'http://localhost:3000']
    : ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Connexion à MongoDB Atlas
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connecté: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erreur: ${error.message}`);
    if (process.env.NODE_ENV === 'production') {
      console.error(error);
    }
  }
};

connectDB();

// Routes
const bookRoutes = require("./routes/books");

// Route racine
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API Book Manager" });
});

// Health check route for Vercel
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Books API routes
app.use("/api/books", bookRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: "Une erreur est survenue sur le serveur",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// En développement uniquement
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Serveur en écoute sur le port ${PORT}`));
}

// Export pour Vercel
module.exports = app;
