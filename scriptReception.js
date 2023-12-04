//Selecteurs
let $achats = $("#achat")

let item_bought = JSON.parse(sessionStorage.getItem('item-bought'))

alert(item_bought.nom_item)

let beta_liste_inventaire = item_bought.nom_item.split(" ")
$achats.text("AA")
