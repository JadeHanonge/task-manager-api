const db = require('../config/db');

//fonction pour recupérer toutes les tâches
const getAllTasks = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM task');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Database query error' });
    }
};



//fonction pour ajouter une tâche
const addTask = async (req, res) => {
    const { title, description, comments, status_id } = req.body;
    try {
        const [result] = await db.query('INSERT INTO task (title, description, comments, status_id) VALUES (?, ?, ?, ?)', [title, description, comments, status_id]);
        res.status(201).json({ message: 'Task added successfully', taskId: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Database insert error' });
    }
}

//fonction pour modifier une tâche
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, comments, status_id } = req.body;
    try {
        await db.query('UPDATE task SET title = ?, description = ?, comments = ?, status_id = ? WHERE id = ?', [title, description, comments, status_id, id]);
        res.json({ message: 'Task updated successfully' });

        if(status_id === 3){
            db.query('UPDATE task SET closed_date = NOW() WHERE id = ?', [id]);
        }

    } catch (err) {
        res.status(500).json({ error: 'Database update error' });
    }
};

//fonction pour supprimer une tâche
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM task WHERE id = ?', [id]);
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Database delete error' });
    }
};

//fonction pour récuperer une tâche par son ID
const getTaskById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM task WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Database query error' });
    }
};

module.exports = {
    getAllTasks, addTask, getTaskById, updateTask, deleteTask
};