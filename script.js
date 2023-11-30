//Sélecteurs
const $argent_select = $("#argent")
const $attaque_select = $("#attaque")
const $defense_select = $("#defense")
const $liste_items = $("#items")
const objets = JSON.parse(sessionStorage.getItem("items"));
const $select_achat = $("#achat")

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

function creerCarte(aventurier) {
    $("#aventuriers").append(`
    <li class = "card col-3 m-2">
  <img src="${aventurier.avatar}" class="card-img-top mt-2" alt="Avatar de ${aventurier.nom}">
  <div class="card-body">
    <h2 class="card-title h5">${aventurier.nom}</h2>
    <div class = "card-text">
        <label for = "heros-${aventurier.id}">Ma couleur préféré :</label>
        <input type = "color" value = "${aventurier.couleur}" id = "heros-${aventurier.id}" disabled>
    </div>
    <a href="#" class="btn btn-primary">Voir détails</a>
  </div>
</li>`)
}

fetch('items.json')
    .then(function (reponse){
        //un probleme c'est produit
        if(!reponse.ok){
            //Lancer une exception(pas de distinction de syntaxe entre exception et erreur
            throw new Error ("Erreur "+reponse.status);
        }

        if (reponse.ok)
        {
            console.log("Appel fonctionne")
        }
        return reponse.json();
    })
    .then(function(items) {
        let items_ajoute = ''
        items.forEach(function (items) {
            // WebStorm chiale pour nom, mais il faut utiliser le nom de la clé, donc ''erreur'' mais fonctionne
                items_ajoute+='<option>'+items.id+ " " + items.nom+'</option>'
        });
            $select_achat.append(items_ajoute);
    })
    //Attraper et gérer
    .catch(function(erreur){
        $('.alert').text(erreur.message).removeClass('d-none');
    })