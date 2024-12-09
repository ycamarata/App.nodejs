const sqlite3 = require('sqlite3').verbose();
 
// Créer une nouvelle base de données
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.log("Erreur de connexion :", err.message);
  } });
 
    // Créer la table avec la colonne prenom
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      prenom TEXT
    )`, (err) => {
      if (err) {
        console.log("Erreur lors de la création de la table :", err.message);
      } else {
        console.log("Table 'users' créée avec succès.");
      }
    });
 
module.exports = db;