const db = require('../config/db');

//fonction pour recupérer toutes les tâches
const getAllTasks = (req, res) => {
    db.query('SELECT * FROM task', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        res.json(results);
    });
};

module.exports = {
    getAllTasks,
};

//fonction pour ajouter une tâche

//fonction pour modifier une tâche

//fonction pour supprimer une tâche

//fonction pour récuperer une tâche par son ID