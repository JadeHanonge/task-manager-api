const e = require('express');
const mysql = require('mysql2');
require('dotenv').config();

//configuration de la connexion à la base de donées
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnecions : true,
    connectionLimit : 10,
    queueLimit : 0
});

//Vérification de la connexion
db.getConnection((err, connection) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    return;
  }else {
    console.log('Connexion à la base de données réussie !');
    connection.release();
  }
});

module.exports = db;