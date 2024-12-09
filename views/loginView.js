function loginView() {
    return `
    <html>
    <body>
        <form action="/login" method="POST">
            <label for="name">Nom utilisateur :</label>
            <input type="text" id="name" name="name" required><br>
 
            <label for="prenom">Prénom :</label>
            <input type="text" id="prenom" name="prenom" required><br>
 
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required><br>
 
            <input type="submit" value="Se connecter">
        </form>
    </body>
</html>`;
  }
 
  module.exports = loginView;