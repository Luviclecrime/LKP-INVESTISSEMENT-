document.addEventListener('DOMContentLoaded', function () {
    // Initialisation du solde
    let soldeActuel = 0;
    document.getElementById('solde').value = soldeActuel + ' XAF';

    // Génération d'un lien de parrainage unique (exemple)
    var userId = Math.floor(Math.random() * 100000); // Remplacez ceci par l'ID utilisateur réel
    var parrainageLink = "https://monsite.com/parrainage?ref=" + userId;
    document.getElementById('parainage').value = parrainageLink;

    // Copier le lien de parrainage
    document.getElementById('copiel').addEventListener('click', function () {
        var copyText = document.getElementById('parainage');
        copyText.disabled = false;
        copyText.select();
        document.execCommand('copy');
        copyText.disabled = true;
        alert("Lien de parrainage copié!");
    });

    // Script pour afficher le réseau choisi
    document.getElementById('reseau').addEventListener('change', function () {
        var reseauChoisi = this.value;
        document.getElementById('choix-reseau').textContent = 'Vous avez choisi le réseau : ' + reseauChoisi;
    });

    // Script pour copier le numéro MTN
    document.getElementById('copie-numero-mtn').addEventListener('click', function () {
        var numeroMTN = '654568728';
        navigator.clipboard.writeText(numeroMTN);
        alert('Numéro MTN copié : ' + numeroMTN);
    });

    // Script pour copier le numéro ORANGE
    document.getElementById('copie-numero-orange').addEventListener('click', function () {
        var numeroOrange = '691452086';
        navigator.clipboard.writeText(numeroOrange);
        alert('Numéro ORANGE copié : ' + numeroOrange);
    });

    // Script pour vérifier l'ID de la transaction et mettre à jour le solde
    document.getElementById('soumis').addEventListener('click', function () {
        var idTransaction = document.getElementById('transaction-id').value;
        var montantRecharge = parseFloat(document.getElementById('recharge').value);
        var reseauChoisi = document.getElementById('reseau').value;

        var validTransactions = {
            '654568728': 'MTN CAMEROUN',
            '691452086': 'ORANGE CAMEROUN'
        };

        var message;
        if (idTransaction === montantRecharge + validTransactions[reseauChoisi]) {
            message = 'ID de transaction correct : soumission réussie.';
            soldeActuel += montantRecharge;
            document.getElementById('solde').value = soldeActuel + ' XAF';
        } else {
            message = 'ID incorrect, veuillez vérifier les informations fournies.';
        }
        alert(message);
    });
});

function initUsers() {
        if (!localStorage.getItem('usersDB')) {
            let usersDB = {
                12345: { solde: 10000, parrain: null },  // Un utilisateur sans parrain
                67890: { solde: 15000, parrain: 12345 }, // Un utilisateur avec un parrain (userId: 12345)
            };
            localStorage.setItem('usersDB', JSON.stringify(usersDB));
        }
    }

    // Fonction pour obtenir les utilisateurs depuis localStorage
    function getUsers() {
        return JSON.parse(localStorage.getItem('usersDB'));
    }

    // Fonction pour sauvegarder les utilisateurs dans localStorage
    function saveUsers(users) {
        localStorage.setItem('usersDB', JSON.stringify(users));
    }

    // Fonction d'investissement
    function investir(userId, montant) {
        let usersDB = getUsers();

        if (!usersDB[userId]) {
            return "Utilisateur non trouvé.";
        }

        usersDB[userId].solde += montant;

        let parrainId = usersDB[userId].parrain;
        let message = "Nouvelle solde de l'utilisateur (ID: " + userId + "): " + usersDB[userId].solde + " XAF";

        if (parrainId) {
            let bonus = montant * 0.07;
            usersDB[parrainId].solde += bonus;
            message += "<br>Bonus de " + bonus + " XAF ajouté au compte du parrain (ID: " + parrainId + ").";
        }

        saveUsers(usersDB);
        return message;
    }

    document.addEventListener('DOMContentLoaded', function() {
        initUsers();

        document.getElementById('investirBtn').addEventListener('click', function() {
            let userId = document.getElementById('userId').value.trim();
            let montant = parseInt(document.getElementById('montant').value.trim());

            if (!userId || isNaN(montant)) {
                document.getElementById('message').innerHTML = "Veuillez entrer un ID utilisateur valide et un montant.";
                return;
            }

            let message = investir(userId, montant);
            document.getElementById('message').innerHTML = message;
        });
    });
