// Fichier: investments.js

// Fonction pour récupérer le solde du compte depuis le LocalStorage
function getAccountBalance() {
    let balance = localStorage.getItem('accountBalance');
    return balance ? parseInt(balance) : 0;
}

// Fonction pour mettre à jour le solde du compte dans le LocalStorage
function updateAccountBalance(newBalance) {
    localStorage.setItem('accountBalance', newBalance);
}

// Fonction pour ajouter un investissement en cours
function addOngoingInvestment(packDetails) {
    let ongoingInvestments = JSON.parse(localStorage.getItem('ongoingInvestments')) || [];
    ongoingInvestments.push(packDetails);
    localStorage.setItem('ongoingInvestments', JSON.stringify(ongoingInvestments));
}

// Fonction pour investir dans un pack
function invest(packId, packPrice, packName) {
    let balance = getAccountBalance();

    if (balance >= packPrice) {
        // Déduire le prix du pack du solde du compte
        let newBalance = balance - packPrice;
        updateAccountBalance(newBalance);

        // Ajouter le pack aux investissements en cours
        addOngoingInvestment({ id: packId, name: packName, price: packPrice });

        // Afficher un message de succès
        alert("Investissement réussi!");

        // Rediriger vers la page des investissements en cours (si nécessaire)
        // window.location.href = "investments.html";
    } else {
        // Afficher un message de solde insuffisant
        alert("Solde insuffisant!");
    }
}

// Écouter les clics sur les boutons d'investissement
document.getElementById('bt1').addEventListener('click', function() {
    invest('bt1', 5000, 'Montre en or massif');
});

document.getElementById('bt2').addEventListener('click', function() {
    invest('bt2', 10000, 'Ancien lecteur de musique');
});

document.getElementById('bt3').addEventListener('click', function() {
    invest('bt3', 20000, 'Bijou indien');
});

document.getElementById('bt4').addEventListener('click', function() {
    invest('bt4', 20000, 'Statuette du symbole du sport');
});

document.getElementById('bt7').addEventListener('click', function() {
    invest('bt7', 40000, 'Gold I');
});

document.getElementById('bt8').addEventListener('click', function() {
    invest('bt8', 50000, 'Gold II');
});

