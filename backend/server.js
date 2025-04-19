const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Pour parser le body JSON

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log(" MongoDB connecté"))
  .catch((err) => console.error("Erreur MongoDB :", err));

// Routes
const bookRoutes = require("./routes/books");
app.use("/api/books", bookRoutes);

// Démarrage du serveur
const PORT = 5000;
app.listen(PORT, () => console.log(` Serveur en écoute sur http://localhost:${PORT}`));
