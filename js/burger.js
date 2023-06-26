//Afin d'optimiser l'espace mémoire, nous pouvons utiliser la même variable pour toutes les tâches nécessitant le nom
//des ingrédients personnalisés.
let ingredientPerso;
let message = $('#texte'); //Le sélecteur du message de retour utilisateur (succès/erreur)
let formulaire = $('form'); //Le sélecteur du formulaire
let ingrediens = [$('#ingredient_1'), $('#ingredient_2'), $('#ingredient_3')]; //Les sélecteurs des selects réservés aux ingrédients

$(document).ready(function () {
    //On insère tous les ingrédients personnalisés dans le sessionStorage (s'il y en a)
    for(let ingredientChoix of ingrediens) for(let i=0; i < sessionStorage.length; i++) {
        ingredientPerso = sessionStorage.key(i); //On définit une variable pour éviter les appels de fonctions lourdes excessives
        ingredientChoix[0].innerHTML += "<option value='"+ingredientPerso+"'>"+ingredientPerso+"</option>";
    }

    formulaire.submit(function(event) {
        event.preventDefault();
        let nomIngredientChoix;
        let nomBurger = $('#id_nom').val();
        ingredientPerso = {};

        if(nomBurger.length < 1) retourUtilisateur(
            message,'erreur', "Vous devez préciser un nom pour votre burger !", "Paramètres incorrects !"
        );
        else {
            for (let ingredientChoix of ingrediens) {
                nomIngredientChoix = ingredientChoix.children("option:selected").val() //Même procédé que la ligne 8
                if (ingredientPerso.hasOwnProperty(nomIngredientChoix)) ingredientPerso[nomIngredientChoix] = ingredientPerso[nomIngredientChoix] + 1;
                else ingredientPerso[nomIngredientChoix] = sessionStorage.getItem(nomIngredientChoix) || 1;
            }
            localStorage.setItem(nomBurger, JSON.stringify(ingredientPerso));
            retourUtilisateurHTML(message, 'succes', "Le burger <em>" + nomBurger + "</em> a bien été ajouté ! Nous vous le préparons tout de suite !! :p");
        }
        this.reset();
    })
})