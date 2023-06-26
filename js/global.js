/*
 * On place dans ce programme les fonctions qui seront utilisées dans plusieurs pages afin de ne pas avoir à les
 * réécrire à chaque fois.
 * Il est également possible de rajouter ici des morceaux de code qui sont destinés à être utilisés dans toutes
 * les pages du site.
 * Ex : On pourrait par exemple placer ici le programme d'une bannière animée qui serait affichée sur toutes les
 * pages, ou encore un programme gérant des "données en temps réelles" actualisées par une API externe et affichées
 * sur toutes les pages. Etc...
 */

/*
 * On définit une courte fonction permettant d'inverser rapidement et efficacement l'état du message de succès/erreur
 * Dans le cadre du TP, cette fonction est utilisée dans les pages permettant une entrée de données de la part de
 * l'utilisateur.
 * Si on souhaite afficher une erreur, le programme retire l'aspect visuel de succès du message pour insérer et
 * celui du message d'erreur ; et inversement.
 */
function switcher(element, mode) {
    if (mode === 'erreur') element.removeClass('succes').addClass('erreur')
    else element.removeClass('erreur').addClass('succes')
}

/*
 * On garde la fonction switcher si on souhaite simplement modifier le rendu du message sans changer son contenu
 * à l'avenir. Néanmoins, on prévoit également la possibilité de changer le rendu du message ET son rendu en même
 * temps.
 */
function retourUtilisateur(element, mode, texte, retourConsole = null) {
    if (retourConsole !== null) console.log(retourConsole); //Dans le cas où on souhaite retourner un événement dans la console
    switcher(element, mode);
    element.text(texte)
}

// Idem si on souhaite modifier le contenu HTML du message à la place
function retourUtilisateurHTML(element, mode, texte, retourConsole = null) {
    if (retourConsole !== null) console.log(retourConsole);
    switcher(element, mode);
    element.html(texte)
}
