/* console.log("ciao je m'en vais"); */
const express = require('express');
const {getUser, showLogin, traiteLogin, showInscription, traiteInscription} = require('./controllers/UserController');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// Lancer le serveur
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
 
 
//Route
app.get('/', getUser);
app.get ( '/login',showLogin);
app.post('/login',traiteLogin);
app.get('/register', showInscription);
app.post('/register', traiteInscription);
