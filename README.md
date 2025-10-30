

# Task Manager API 🗂️


Une API RESTful simple de gestion de tâches, construite avec **Node.js**, **Express**, et **MySQL**.
Elle permet de **créer**, **lire**, **mettre à jour et supprimer** des tâches, tout en suivant leur statut (non commencée, en cours, terminée).

## Fonctionnalités principales 🚀

* Créer une nouvelle tâche
* Récupérer toutes les tâches ou une tâche spécifique
* Mettre à jour une tâche (titre, description commentaires, statut)
* Supprimer une tâche
* Lier chaque tâche à un statut (not started, on going, finished)
* Enregistrer automatiquement la date de clôture quand une tâche passe en statut “finished”

## Stack technique 🧱

* **Backend :** Node.js + EXpress
* **Base de données :** MySQL
* **Environnement :** WSL (unbuntu Linux)
* **Outils :** Postman (pour les tests), dotenv (pour les variables d'environnement)

## Installation et configuration ⚙️

#### 1️⃣ Cloner le Projet

`git clone https://github.com/JadeHanonge/task-manager-api.git`
`cd task-manager-api`

#### 2️⃣ Installer les dépendances

`npm install` 

#### 3️⃣ Configurer les variables d'environement

`DB_HOST = localhost`  
`DB_USER= user`  
`DB_PASSWORD= mot_de_passe`  
`DB_NAME= task_manager`  
`PORT= 3000`  

#### 4️⃣ Configurer la base de données MySQL

Lancer MySQL et créer la base :

```sql
CREATE DATABASE task_manager;
USE task_manager;
```

Ensuite, crée les tables :

```sql
CREATE TABLE status (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

INSERT INTO status (name) VALUES ('Not started'), ('On going'), ('Finished');

CREATE TABLE task (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    closed_date TIMESTAMP NULL,
    comments TEXT,
    status_id INT,
    FOREIGN KEY (status_id) REFERENCES status(id)
);
```

#### ▶️ Lancer le serveur

`npm start`

## Endpoints principaux 📬

| Méthode         | Route              | Description                   |
| --------------- | ------------------ | ----------------------------- |
| GET             | api/tasks          | Récupère toutes les tâches    |
| GET             | api/tasks/:id      | Récupère une tâche spécifique |
| POST            | api/addTask        | Crée une nouvelle tâche       |
| PUT             | api/updateTask/:id | Met à jour une tâche          |
| DELETE          | api/deleteTask/:id | Supprime une tâche            |

## Exemple de test avec Postman 🧪

#### ➕ Créer une tâche 
**POST** http://localhost:5000/api/addTask  
**Body (JSON) :**

```json
{
  "title": "Faire le rapport",
  "description": "Rédiger la partie API du rapport",
  "comments": "Commencer avant vendredi",
  "status_id": 1
}
```

#### 🔄 Mettre à jours une tâche
**PUT** http://localhost:5000/api/updateTasks/7  
**Body (JSON) :**

```json
{
  "title": "Tester Postman",
  "description": "Vérifier que la tâche est bien insérée",
  "comments": "Premier test",
  "status_id": 3
}
```
La date *closed_date* sera automatiquement enregistrée.

## Amélioration futures 💡
* Authentification des utilisateurs
* Filtrage des tâches par statut
* Pagination et recherche