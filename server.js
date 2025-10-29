// initialitiation server
const express = require('express');
const cors = require('cors');
const projectsRoutes = require('./backend/routes/app.routes');

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());

//utiliser les routes définies dans routes.js
app.use(express.json());
app.use('/api', projectsRoutes);

//Lancer le serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});