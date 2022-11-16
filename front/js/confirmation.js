//Récupération d'ID de commande
const orderId = new URL(window.location).searchParams.get("order_id");

//Affichage du numéro de commande dans le DOM
function displayOrderId(id) {
  document.querySelector("#orderId").innerText = id;
}

displayOrderId(orderId);
