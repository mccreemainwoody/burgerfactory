$(document).ready(function(){
    let message = $('#texte'); //Le sélecteur du message de retour utilisateur (succès/erreur)
    let formulaire = $('#form'); //Le sélecteur du formulaire

    formulaire.submit(function(event){
        //On rappelle que preventDefault permet à un formulaire (ou autre) de ne pas envoyer de requête par elle-même et
        //donc de ne pas mener à une actualisation de la page. De ce fait, les données sont gérées par le programme JS.
        event.preventDefault();
        let nom = $('#id_nom').val(), quantite = $('#id_numero').val(); //Les valeurs des champs du formulaire

        //On exécute des vérifications sur les données avant de les manipuler
        //Si une erreur est trouvée, on le précise à l'utilisateur...
        if(nom.length < 1 || quantite < 1) retourUtilisateur(
            message,'erreur', "L'un de vos paramètres sont incorrects !", "Paramètres incorrects !"
        );

        //... Idem si l'ingrédient existe déjà ...
        else if(sessionStorage.getItem(nom) !== null) retourUtilisateur(
            message,'erreur', "Attention ! L'ingrédient "+nom+" existe déjà !", "Ingrédient déjà existant"
        );

        else { //Et si les valeurs sont utilisables, on les enregistre dans le sessionStorage
            sessionStorage.setItem(nom, quantite);
            retourUtilisateur(
                message, 'succes', "L'ingrédient " + nom + " a bien été ajouté ! Utilisez-le pour créer votre burger :p"
            );
        }
        this.reset(); //Peu importe le résultat, on réinitialise le formulaire à chaque submit
    })
})