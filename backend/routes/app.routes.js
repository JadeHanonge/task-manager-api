const express = require('express');
const { getAllTasks, addTask } = require('../controllers/app.controller');

const router = express.Router();

// Route pour récupérer toutes les tâches
router.get('/tasks', getAllTasks);
//route pour ajouter une tâche
router.post('/addTask', addTask);

module.exports = router;