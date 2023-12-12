//Sélecteurs
const $argent_select = $("#argent")
const $attaque_select = $("#attaque")
const $defense_select = $("#defense")
const $select_achat = $("#achat")
const $lien = $("#LienNouvellePage")
const $alerte = $("#Alerte_fonds")
let $bonus_atk = $("#Bonus_attaque")
let $bonus_def = $("#Bonus_defense")
let $body = $("#Body")

//Objets
let $personnage = {
    argent : 3000,
    attaque : 5,
    defense : 5
}

//Boutons
const $btn_confirmer = $("#Confirmer")


//Fonction pour modifier le texte des stats du perso
function modif_texte_perso(){
    //Argent
    $argent_select.text($personnage.argent.toFixed(2)) // toFixed pour choisir le nombre de décimales

    //Attaque
    $attaque_select.text($personnage.attaque)

    //Defense
    $defense_select.text($personnage.defense)

}

//Pour envoi sur autre page
function Item_Bought (p_nom_item = '')
{
    this.nom_item = p_nom_item
}


//MAIN SCRIPT
//On crée le personnage
modif_texte_perso()

//Liste d'items globale (vide pour le moment)
let list_items = []
let liste_envoi = []
fetch('items.json')
    .then(function (reponse){
        //un probleme c'est produit
        if(!reponse.ok){
            //Lancer une exception(pas de distinction de syntaxe entre exception et erreur
            throw new Error ("Erreur "+reponse.status);
        }
        return reponse.json();
    })
    .then(function(items) {

        //Remplir la liste
        list_items = items

        let items_ajoute = ''
        items.forEach(function (items) {
            // WebStorm chiale pour nom, mais il faut utiliser le nom de la clé, donc ''erreur'' mais fonctionne
            items_ajoute+='<option>'+items.id+ " " + items.nom+'</option>'

            // Ajouter le nom des items au tableau
            $body.append("<tr>" + "<td>" + items.nom + "</td>" +
                "<td>" +items.defense +"</td>"+ "</td>" +
                "<td>" +items.attaque +"</td>"  +
                "<td>" + items.prix +  "</td>" + "</tr>")
        });
            $select_achat.append(items_ajoute);
    })
    //Attraper et gérer
    .catch(function(erreur){
        $('.alert').text(erreur.message).removeClass('d-none');
    })

//Modifier stats perso selon item
$btn_confirmer.on('click', function (){
{
    //Aller chercher l'item correspondant dans la liste
    //Séparer l'id de l'item
    let id_item_achete = $select_achat.val().split(" ")[0] // Index 0 pour choisir l'ID

    list_items.forEach(function(element)
    {
        if(element.id.toString() === id_item_achete)  // Si ID item acheté correspond à un de la liste
        {
            //On ajoute l'objet acheté à la liste
            liste_envoi.push(element.nom + " ")

            //Remettre l'alerte invisible ou la garder ainsi si tout va bien
            $alerte.text("")
            //Augmenter l'attaque
            $personnage.attaque += element.attaque

            //Augmenter la défense
            $personnage.defense += element.defense

            //Retirer le coût du stat d'argent
            let prix_normal = element.prix.split("$")[1]

            let prix_float = parseFloat(prix_normal)

            $personnage.argent -= prix_float

            if($personnage.argent <= 0)
            {
                //Aviser le user qu'il n'a pas assez de fonds
                $alerte.text("Fonds insuffisants pour l'achat")

                //Redonner l'argent pour ne pas tomber dans le negatif
                $personnage.argent += prix_float

                //Re-descendre stats du perso pour éviter d'augmenter si item non acheté
                $personnage.attaque -= element.attaque
                $personnage.defense -= element.defense

                // Re-descendre les stats bonus pour empêcher d'augmenter si item non acheté
                $bonus_atk-=element.attaque
                $bonus_def-=element.defense

            }

            //Modifier le texte
            modif_texte_perso()
        }
    })
    }
})

$lien.on('click', function ()
{
   let confirmation = confirm('Voulez-vous bien changer de page?')
    if (confirmation)
    {
        // Re-coller les mots dans une nouvelle liste sans l'ID
        //join pour coller mots, .replace pour remplacer dans ce cas la virgule, g pour global, " " pour remplacer par espace

        //Pour autre page
        const list_item_bought = new Item_Bought(liste_envoi.toString())
        sessionStorage.setItem('item-bought', JSON.stringify(list_item_bought))


        window.location = "2ePage.html"
    }
    else
    {
         // Ne rien faire
    }
})
