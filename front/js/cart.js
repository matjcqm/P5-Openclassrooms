// récupération du tableau du canapés dans l'API

import { fetchData } from "./utils/fetch.js";

// récupération du lien de l'API

const urlcanapes = "http://localhost:3000/api/products";

// récupération du tableau du LocalStorage

let canapesCart = JSON.parse(localStorage.getItem("products"));

// Affichage des produits qui se trouvent dans le LocalStorage

function getCartHtml(item, canape) {
  return `<article class="cart__item" data-id="${item.idProduct}" data-color="${item.color}">
            <div class="cart__item__img">
              <img src="${canape.imageUrl}" alt="${canape.altTxt}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${canape.name}</h2>
                <p>${item.color}</p>
                <p>${canape.price},00 €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : ${item.quantity}</p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article>`;
}

fetchData(urlcanapes).then((canapesApi) => {
  const carte = document.querySelector("#cart__items");
  let html = "";
  if (canapesCart) {
    canapesCart.map((item) => {
      const canape = canapesApi.find(
        (canapId) => canapId._id == item.idProduct
      );
      html += getCartHtml(item, canape);
    });
    carte.innerHTML = html;
  } else {
    carte.innerHTML = "<h2>Votre panier est vide</h2>";
  }
});



// const displayCart = async () => {
// const tableauCanapes = await fetchData(urlcanapes); //Tableau des canapés de l'API
// const carte = document.querySelector("#cart__items");
// if (cartTableau) {
//   cartTableau.map((item) => {
//     const canape = tableauCanapes.find(
//       (idCanap) => idCanap._id == item.idProduct
//     );
//   const article = document.createElement("article");
//   article.classList.add("cart__item");
//   article.setAttribute("data-id", item.idProduct);
//   article.setAttribute("data-color", item.color);
//   carte.appendChild(article);
//   const divImage = document.createElement("div");
//   divImage.classList.add("cart__item__img");
//   article.appendChild(divImage);
//   const image = document.createElement("img");
//   image.setAttribute("src", canape.imageUrl);
//   image.setAttribute("alt", canape.altTxt);
//   divImage.appendChild(image);
//   const divContent = document.createElement("div");
//   divContent.classList.add("cart__item__content");
//   article.appendChild(divContent);
//   const divDescription = document.createElement("div");
//   divDescription.classList.add("cart__item__content__description");
//   divContent.appendChild(divDescription);
//   const name = document.createElement("h2");
//   name.innerHTML = canape.name;
//   divDescription.appendChild(name);
//   const color = document.createElement("p");
//   color.innerHTML = item.color;
//   divDescription.appendChild(color);
//   const price = document.createElement("p");
//   price.innerHTML = `${canape.price},00€`;
//   divDescription.appendChild(price);
//   const divSettings = document.createElement("div");
//   divSettings.classList.add("cart__item__content__settings");
//   divContent.appendChild(divSettings);
//   const divQuantity = document.createElement("div");
//   divQuantity.classList.add("cart__item__content__settings__quantity");
//   divSettings.appendChild(divQuantity);
//   const quantity = document.createElement("p");
//   quantity.innerHTML = `Qté : ${item.quantity}`;
//   divQuantity.appendChild(quantity);
//   const inputQuantity = document.createElement("input");
//   inputQuantity.classList.add("itemQuantity");
//   inputQuantity.setAttribute("type", Number);
//   inputQuantity.setAttribute("name", "itemQuantity");
//   inputQuantity.setAttribute("min", 1);
//   inputQuantity.setAttribute("max", 100);
//   inputQuantity.setAttribute("value", item.quantity);
//   divQuantity.appendChild(inputQuantity);
//   const divDelete = document.createElement("div");
//   divDelete.classList.add("cart__item__content__settings__delete");
//   divSettings.appendChild(divDelete);
//   const buttonDelete = document.createElement("p");
//   buttonDelete.classList.add("deleteItem");
//   buttonDelete.innerHTML = "Supprimer";
//   divDelete.appendChild(buttonDelete);
// });
//   } else {
//     const text = document.createElement("h2");
//     text.innerHTML = "Votre panier est vide";
//     carte.appendChild(text);
//   }
// };

// displayCart();



// Calcul du nombre de produit dans le panier

// const totalQuantity = document.querySelector("#totalQuantity");
// if (cartTableau) {
//   cartTableau.forEach((canape) => {
//     console.log(canape.quantity);
//   });
// }
// totalQuantity.innerText = cartTableau.length;

// const totalPrice = document.querySelector("#totalPrice");
// // totalPrice.innerHTML = item.price

// const order = document.querySelector("#order");
// order.addEventListener("click", function () {
//   if (cartTableau) {
//   } else {
//     window.alert("Votre panier est vide");
//   }
// });
