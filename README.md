# Gestionnaire de Bibliothèque

Une application web de gestion de bibliothèque construite avec la stack MERN (MongoDB, Express, React, Node.js) et utilisant PrimeReact pour l'interface utilisateur.

## Fonctionnalités

- Liste des livres avec pagination et tri
- Ajout de nouveaux livres
- Modification des livres existants
- Suppression de livres
- Interface utilisateur moderne et responsive

## Technologies Utilisées

### Frontend
- React
- PrimeReact
- Axios pour les requêtes HTTP

### Backend
- Node.js
- Express
- MongoDB avec Mongoose
- CORS

## Installation

1. Clonez le repository
```bash
git clone [URL_DU_REPO]
```

2. Installez les dépendances du backend
```bash
cd backend
npm install
```

3. Installez les dépendances du frontend
```bash
cd frontend
npm install
```

4. Configurez les variables d'environnement
- Créez un fichier `.env` dans le dossier backend
```
MONGO_URI=votre_uri_mongodb
```

## Démarrage

1. Démarrez le serveur backend
```bash
cd backend
npm start
```

2. Démarrez l'application frontend
```bash
cd frontend
npm start
```

L'application sera accessible à l'adresse http://localhost:3000

## Structure du Projet

```
book-manager/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   ├── services/
    │   └── App.js
    └── package.json
```

## API Endpoints

- GET `/api/books` - Récupérer tous les livres
- GET `/api/books/:id` - Récupérer un livre spécifique
- POST `/api/books` - Créer un nouveau livre
- PUT `/api/books/:id` - Mettre à jour un livre
- DELETE `/api/books/:id` - Supprimer un livre

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request. 