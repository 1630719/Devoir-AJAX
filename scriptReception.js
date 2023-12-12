//Selecteurs
let $inventaire = $("#Inventaire")

let item_bought = JSON.parse(sessionStorage.getItem('item-bought'))

let list_items_bought = item_bought.nom_item.split(",")


list_items_bought.forEach(function (item)
{
    $inventaire.append('<li>' + item)
})