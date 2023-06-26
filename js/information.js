/*
    * Afin d'afficher tous les éléments de l'API, nous allons devoir manipuler beaucoup de variables
    * De ce fait, nous "recréeons" une fonction format(args) pour nos chaînes de caractères prenant en paramètre
    * un tableau de valeurs string et qui les concatène dans la chaîne de caractères à la position demandée
    * Pour indiquer les positions de chaque élément, nous utilisons des accolades {} suivi de leur position
    * dans le tableau de valeurs. (une méthode bien connue d'autres langages de programmation, comme en PHP ou en C# !
    * Exemple : format("Bonjour {0} {1}", ["Monsieur", "Dupont"]) renvoie "Bonjour Monsieur Dupont"
 */
String.prototype.format = function (args){
    let texte = this; //Permet à notre variable d'être affecté par son propre changement
    for (let i in args) texte = texte.replace(new RegExp('\\{' + i + '\\}', 'g'), args[i]);
    //On utilise une expression régulière pour retrouver les accolades correspondant aux positions des valeurs du tableau
    return texte;
}

let positionTexte = $('#informations-api')[0];
let positionCommerces = $('#informations-api-partenaires')[0];

/*
    * On note que...
    * - Le paramètre {0} constitue au numéro de la femre
    * - Le paramètre {1] constitue au nom du gérant de la ferme
    * - Le paramètre {2} constitue l'adresse de la ferme :
    *   --> Il est constitué des 3 éléments retournés par l'API : adresse, code postal et ville
 */
let texte = "Notre restaurant travaille avec des produits locaux provenant de la ferme bio numéro {0} de Monsieur {1} située à l’adresse {2}. Cette ferme intervient dans les commerces :\n";

$(document).ready(function() {
    var donnees_api = $.getJSON('https://opendata.agencebio.org/api/gouv/operateurs/', {'siret' : '79317749400028'})
        .done( (data) => {
            /*
             * On place l'adresse à afficher dans une variable locale.
             * De cette manière, on ne devra pas reparcourir le tableau pour chaque morceau de données
             * et le programme sera plus rapide.
             */
            let adresseOperateur = data.items[0]['adressesOperateurs'][0];

            //Enfin, on affiche le texte formaté avec les données de l'API en cas de retour
            positionTexte.innerText += texte.format(
                [
                    data.items[0]['numeroBio'],
                    data.items[0]['gerant'],
                    adresseOperateur['lieu'] + ' ' + adresseOperateur['codePostal'] + ' ' + adresseOperateur['ville']
                ]);

            for(let commerce of data.items[0]['productions']) positionCommerces.innerHTML += '<li>' + commerce['nom'] + '</li><br>';
        })
        .fail( () => {
            console.log("Erreur de connexion à l'API des professionnels bio");
        });
})