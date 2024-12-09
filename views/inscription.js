function inscriptionView() {
    return `
    <html>
        <body>
            <h1>Formulaire d'inscription</h1>
            <form action="/register" method="POST">
                <label for="name">Nom*:</label>
                <input type="text" id="name" name="name" required><br>
 
                <label for="prenom">Prenom*:</label>
                <input type="text" id="prenom" name="prenom" required><br>
 
                <label for="password">Crée mot de passe*:</label>
                <input type="password" id="password" name="password" required><br>
 
                <input type="submit" value="S'inscrire">
            </form>
        </body>
    </html>`;
}
 
module.exports = inscriptionView;