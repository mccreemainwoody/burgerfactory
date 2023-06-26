$(document).ready(function () {
    const time = 10000;
    let diaporama = $('#diaporama')[0];
    let texte = $('.texte')[0];


    let json = $.getJSON('data/burger.json')
        .done(function (data) {
            let i = 0;
            let images = data.images || [];

            let changeImg = () => {
                diaporama.src = data.dir + '/' + images[i].nom_entier;
                texte.innerText = images[i].texte;
                if (i < images.length - 1) i++; else i = 0;
                setTimeout(changeImg, time);
            }

            window.onload = changeImg();
        })
        .fail(function () {
            retourUtilisateur(
                texte, 'erreur',
                "Erreur lors du chargement du diaporama. Les images ne se chargeront donc pas.",
                "Erreur de chargement de l'API"
            );
        })
});