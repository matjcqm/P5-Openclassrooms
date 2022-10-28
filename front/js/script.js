// Récupération d'un tableau depuis l'URL d'une API
import { fetchData } from "./utils/fetch.js";

// Récupération du lien de l'API
const urlcanapes = "http://localhost:3000/api/products";

// Fonction View, qui permet d'afficher l'HTML pour un produit
function getProductsHtml(canape) {
  return `<a href="./product.html?id=${canape._id}">
            <article>
              <img src="${canape.imageUrl}" alt="${canape.altTxt}">
              <h3 class="productName">${canape.name}</h3>
              <p class="productDescription">${canape.description}</p>
            </article>
          </a>`;
}

// Utilisation de la fonction importée avec l'URL de l'API
fetchData(urlcanapes)
  // Création d'une carte HTML avec la fonction View pour CHAQUE canapé se trouvant dans le tableau de l'API
  .then((canapesApi) => {
    const productCard = document.querySelector("#items");
    let html = "";
    canapesApi.map((canape) => {
      html += getProductsHtml(canape);
    });
    productCard.innerHTML = html;
  })
  // Récupération de l'erreur et affichage d'un message si problème sur l'API
  .catch((error) => {
    document.querySelector(".titles").innerHTML = "<h1>Erreur 404</h1>";
    console.log(error);
  });
