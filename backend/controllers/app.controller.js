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



//fonction pour ajouter une tâche
const addTask = (req, res) => {
    const { title, description, comments, status_id } = req.body;
    db.query('INSERT INTO task (title, description, comments, status_id) VALUES (?, ?, ?, ?)', [title, description, comments, status_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database insert error' });
        }
        if (!title || !status_id) {
            return res.status(400).json({ error: 'Title and Status ID are required' });
        }
        res.status(201).json({ id: results.insertId, title, description, comments, status_id });
    });
}

//fonction pour modifier une tâche
const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, comments, status_id } = req.body;
    db.query('UPDATE task SET title = ?, description = ?, comments = ?, status_id = ? WHERE id = ?', [title, description, comments, status_id, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database update error 1' });
        }
        if (status_id == 3) {
            const completionDate = new Date();
            db.query('UPDATE task SET closed_date = ? WHERE id = ?', [completionDate, id], (err) => {
                if (err) {
                    return res.status(500).json({ error: 'Database update error 2' });
                }
            });
        }
        res.json({ message: 'Task updated successfully' });
    });
};

//fonction pour supprimer une tâche

//fonction pour récuperer une tâche par son ID
const getTaskById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM task WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(results[0]);
    });
};

module.exports = {
    getAllTasks, addTask, getTaskById, updateTask
};