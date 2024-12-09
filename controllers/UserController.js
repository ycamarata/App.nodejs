const User = require('../models/User');
const userView = require('../views/UserView');
const loginView = require('../views/loginView');
const inscriptionView = require('../views/inscription');
const db = require('../db/db');
const bcrypt = require('bcrypt')


function getUser(req,res){
    const user = new User("Tintin");
    res.send(userView(user));
}

function showLogin(req, res){
    res.send(loginView());
}

function showInscription(req,res){
    res.send(inscriptionView());
}

function traiteLogin(req, res) {
    const { name, password } = req.body;
 
    // Rechercher l'utilisateur par son nom
    const query = 'SELECT * FROM users WHERE username = ?';
 
    db.get(query, [name], (err, row) => {
        if (err) {
            console.log("Erreur de recherche dans la base de données :", err.message);
            return res.status(500).send("Erreur lors de la recherche de l'utilisateur.");
        }
 
        if (!row) {
            // Si l'utilisateur n'est pas trouvé
            return res.send("Erreur : Utilisateur non trouvé.");
        }
 
        // Vérifier si le mot de passe correspond (en comparant le mot de passe haché)
        bcrypt.compare(password, row.password, (err, result) => {
            if (err) {
                console.log("Erreur lors de la comparaison du mot de passe :", err.message);
                return res.status(500).send("Erreur lors de la connexion.");
            }
 
            if (result) {
                // Si les mots de passe correspondent, connecter l'utilisateur
                return res.send(`Bienvenue ${row.username}, vous êtes connecté !`);
            } else {
                // Si les mots de passe ne correspondent pas
                return res.send("Erreur : Mot de passe incorrect.");
            }
        });
    });
}
 
function traiteInscription(req, res) {
 
    // 1. Récupérer les données envoyées dans le formulaire
    const { name, prenom, password } = req.body;
 
    // 2. Vérifier si tous les champs sont remplis (nom, prénom, mot de passe)
 
    if (!name || !prenom || !password) {
     
        return res.status(400).send("Nom, prénom ou mot de passe manquant.");
    }
   
    // 3. Création de l'objet `newUser` avec les données de l'utilisateur
    const newUser = { username: name, prenom: prenom, password: password };
 
    // 4. Hachage du mot de passe
    bcrypt.hash(newUser.password, 10, (err, hashedPassword) => {
        if (err) {
            // Si une erreur se produit lors du hachage du mot de passe
            console.error("Erreur lors du hachage du mot de passe :", err.message);
            return res.status(500).send("Erreur lors de l'enregistrement.");
        }
 
        // 5. Préparer la requête SQL pour insérer un nouvel utilisateur dans la base de données
        const query = 'INSERT INTO users (username, prenom, password) VALUES (?, ?, ?)';
 
        // 6. Exécuter la requête SQL
        db.run(query, [newUser.username, newUser.prenom, hashedPassword], function (err) {
            if (err) {
                // 7. En cas d'échec de l'inscription, afficher l'erreur dans la console
                console.error("Échec de l'inscription :", err.message);
                return res.status(500).send("Échec de l'inscription. Veuillez réessayer.");
            } else {
                // 8. Si l'inscription réussit, afficher un message de succès
                console.log("Utilisateur inscrit avec succès :", newUser);
 
                // 9. Créer un cookie pour l'utilisateur
                res.cookie('user', { name: newUser.username }, {
                    httpOnly: true,
                    secure: false,  // Utilise true en production si ton site est en HTTPS
                    maxAge: 24 * 60 * 60 * 1000 // Le cookie est valide pendant 24 heures
                });
 
                // 10. Envoyer un message de succès à l'utilisateur
                res.send(`Inscription réussie pour ${newUser.username} ${newUser.prenom}! Vous pouvez vous connecter maintenant.`);
            }
        });
    });
}

module.exports = { getUser, showLogin, traiteLogin, showInscription, traiteInscription};

 
 

