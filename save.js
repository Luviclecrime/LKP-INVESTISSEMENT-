<script>
function verification(){
    var nom = document.getElementById("1").value;
    var prenom = document.getElementById("2").value;
    var mots = document.getElementById("3").value;
    var mot = document.getElementById("4").value;
    var adresse = document.getElementById("area").value;

    if(nom == ""){
        alert('Veuillez remplir le champ nom');
        return;
    }
    if(prenom == ""){
        alert('Veuillez remplir le champ prénom');
        return;
    }
    if(mots == ""){
        alert('Veuillez remplir le champ mot de passe');
        return;
    }
    if(mots.length < 6){
        alert('Le mot de passe doit avoir au moins 6 caractères');
        return;
    }
    if(mots !== mot){
        alert('Les mots de passe ne correspondent pas');
        return;
    }
    if(adresse == ""){
        alert('Veuillez remplir le champ adresse email');
        return;
    }

    // Enregistrement des informations dans le localStorage
    localStorage.setItem('nom', nom);
    localStorage.setItem('prenom', prenom);
    localStorage.setItem('motdepasse', mots);
    localStorage.setItem('email', adresse);

    alert('Inscription réussie');
}

function connexion() {
    var nom = prompt("Entrez votre nom");
    var mots = prompt("Entrez votre mot de passe");

    if(nom === localStorage.getItem('nom') && mots === localStorage.getItem('motdepasse')) {
        alert('Connexion réussie, bienvenue ' + nom);
        // Redirigez vers le profil utilisateur ici
    } else {
        alert('Nom ou mot de passe incorrect');
    }
}
</script>

