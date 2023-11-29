//Sélecteurs
const $argent_select = $("#argent")
const $attaque_select = $("#attaque")
const $defense_select = $("#defense")
const $liste_items = $("#items")
const objets = JSON.parse(sessionStorage.getItem("items"));

let $personnage = {
    argent : 50,
    attaque : 10,
    defense : 10
}

function creation_perso(){
    //Argent
    $argent_select.text($personnage.argent)

    //Attaque
    $attaque_select.text($personnage.attaque)

    //Defense
    $defense_select.text($personnage.defense)

}

//MAIN SCRIPT

//On crée le personnage
creation_perso()

//Charger la liste des items

//Besoin d'un param dans function
$.ajax('items.json').done(function ()
{
    $liste_items.text(objets[0].nom)
})

//Collection d'items dans fichier js
//Mettre collection dans session storage > récupérer la collection
//Manipulation collection

