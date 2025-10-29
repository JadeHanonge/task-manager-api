const express = require('express');
const { getAllTasks, addTask, getTaskById, updateTask } = require('../controllers/app.controller');

const router = express.Router();

// Route pour récupérer toutes les tâches ou une tache par ID
router.get('/tasks', getAllTasks);
router.get('/tasks/:id', getTaskById);
//route pour ajouter une tâche
router.post('/addTask', addTask);
//route pour modifier une tâche
router.put('/updateTasks/:id', updateTask);

module.exports = router;