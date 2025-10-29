const express = require('express');
const { getAllTasks } = require('../controllers/app.controller');

const router = express.Router();

// Route pour récupérer toutes les tâches
router.get('/tasks', getAllTasks);

module.exports = router;