// récupération du tableau du canapés dans l'API

<<<<<<< HEAD
import { fetchData } from "./utils/fetch.js";

// récupération du lien de l'API

const urlcanapes = "http://localhost:3000/api/products";

// récupération du tableau du LocalStorage

let cartTableau = JSON.parse(localStorage.getItem("products"));

// Affichage des produits qui se trouvent dans le LocalStorage

const displayCart = async () => {
  const tableauCanapes = await fetchData(urlcanapes); //Tableau des canapés de l'API
  const carte = document.querySelector("#cart__items");
  if (cartTableau) {
    cartTableau.map((item) => {
      const canape = tableauCanapes.find(
        (idCanap) => idCanap._id == item.idProduct
      );
      const article = document.createElement("article");
      article.classList.add("cart__item");
      article.setAttribute("data-id", item.idProduct);
      article.setAttribute("data-color", item.color);
      carte.appendChild(article);
      const divImage = document.createElement("div");
      divImage.classList.add("cart__item__img");
      article.appendChild(divImage);
      const image = document.createElement("img");
      image.setAttribute("src", canape.imageUrl);
      image.setAttribute("alt", canape.altTxt);
      divImage.appendChild(image);
      const divContent = document.createElement("div");
      divContent.classList.add("cart__item__content");
      article.appendChild(divContent);
      const divDescription = document.createElement("div");
      divDescription.classList.add("cart__item__content__description");
      divContent.appendChild(divDescription);
      const name = document.createElement("h2");
      name.innerHTML = canape.name;
      divDescription.appendChild(name);
      const color = document.createElement("p");
      color.innerHTML = item.color;
      divDescription.appendChild(color);
      const price = document.createElement("p");
      price.innerHTML = `${canape.price},00€`;
      divDescription.appendChild(price);
      const divSettings = document.createElement("div");
      divSettings.classList.add("cart__item__content__settings");
      divContent.appendChild(divSettings);
      const divQuantity = document.createElement("div");
      divQuantity.classList.add("cart__item__content__settings__quantity");
      divSettings.appendChild(divQuantity);
      const quantity = document.createElement("p");
      quantity.innerHTML = `Qté : ${item.quantity}`;
      divQuantity.appendChild(quantity);
      const inputQuantity = document.createElement("input");
      inputQuantity.classList.add("itemQuantity");
      inputQuantity.setAttribute("type", Number);
      inputQuantity.setAttribute("name", "itemQuantity");
      inputQuantity.setAttribute("min", 1);
      inputQuantity.setAttribute("max", 100);
      inputQuantity.setAttribute("value", item.quantity);
      divQuantity.appendChild(inputQuantity);
      const divDelete = document.createElement("div");
      divDelete.classList.add("cart__item__content__settings__delete");
      divSettings.appendChild(divDelete);
      const buttonDelete = document.createElement("p");
      buttonDelete.classList.add("deleteItem");
      buttonDelete.innerHTML = "Supprimer";
      divDelete.appendChild(buttonDelete);
    });
  } else {
    const text = document.createElement("h2");
    text.innerHTML = "Votre panier est vide";
    carte.appendChild(text);
  }
};

displayCart();

const totalQuantity = document.querySelector("#totalQuantity");
totalQuantity.innerHTML = cartTableau.length; // Calcul du nombre de produit dans le panier (prendre encore en compte la quantité)


const totalPrice = document.querySelector("#totalPrice");
// totalPrice.innerHTML = item.price

const order = document.querySelector("#order");
order.addEventListener("click", function () {
  if (cartTableau) {
  } else {
    window.alert("Votre panier est vide");
  }
});
=======
import { fetchData } from "./utils/fetch.js"


const displayCart = async () => {
    const product = await fetchData()
}


// const displayProduct = async () => {
//     const product = await fetchData(urlProduct)
//     document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" />`
//     document.getElementById("title").innerHTML = `${product.name}`
//     document.getElementById('price').innerHTML = `${product.price}`
//     document.getElementById("description").innerHTML = `${product.description}` 
//     const colorList = document.querySelector('#colors')

//     // Boucle de création d'une balise 'option' par couleur sur le produit

//     product.colors.map((colors) => {
//         const optionColor = document.createElement('option')
//         optionColor.innerHTML = colors
//         colorList.appendChild(optionColor)
//     })
// }
// displayProduct()
>>>>>>> 9254583c32a8dca340f20ad20aa992833a90f566
