const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Configuration CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://book-manager-frontend.vercel.app', 'http://localhost:3000']
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
    // Ne pas quitter le processus en production
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
};

connectDB();

// Routes
const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

// Health check route for Vercel
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Route racine
app.get("/", (req, res) => {
  res.status(200).json({ message: "API Book Manager" });
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
