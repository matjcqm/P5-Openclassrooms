// Récupération d'un tableau depuis l'URL d'une API
import { fetchData } from "./utils/fetch.js";

// Récupération de l'ID du produit dans l'URL
const params = window.location.search;
const idProduct = new URLSearchParams(params).get("id");

// récupération du lien de l'API lié au produit
const urlProduct = `http://localhost:3000/api/products/${idProduct}`;

// Création et affichage des données du produit dans le DOM
const displayProduct = async () => {
  const product = await fetchData(urlProduct);
  document.querySelector("title").innerHTML = `${product.name}`;
  document.querySelector(
    ".item__img"
  ).innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" />`;
  document.querySelector("#title").innerHTML = product.name;
  document.querySelector("#price").innerHTML = `${product.price}`;
  document.querySelector("#description").innerHTML = `${product.description}`;
  const select = document.querySelector("#colors");

  // Boucle de création d'une balise 'option' par couleur sur le produit
  product.colors.map((color) => {
    const optionColor = document.createElement("option");
    optionColor.text = color;
    select.add(optionColor);
  });
};
displayProduct();

// Fonction du bouton ajouter au panier

const addCart = document.querySelector("#addToCart");
addCart.addEventListener("click", (e) => {
  //Réaction au click sur le bonton
  e.preventDefault();
  const color = document.querySelector("#colors").value;
  const quantity = parseInt(document.querySelector("#quantity").value);
  const productOptions = {
    idProduct,
    quantity,
    color,
  };
  let cartItems = JSON.parse(localStorage.getItem("products")) ?? []; // On récupère le tableau du LocalStorage ou alors création d'un tableau vide
  let cartItem = cartItems.find(
    (item) => item.idProduct == idProduct && item.color == color
  ); // Fonction find pour vérifier si l'ID et la couleur sont similaires
  if (!color || quantity <= 0 || quantity > 101) {
    // Affichage d'un message d'erreur si il n'y a pas de couleur ou de quantité sélectionnée
    window.alert(
      "Veuillez choisir une couleur et une quantité comprise entre 1 et 100"
    );
  } else if (cartItem) {
    // Si la fonction find is true, aditionner les quantités si celle si n'excède pas 100
    if (parseInt(cartItem.quantity) + quantity < 101) {
      cartItem.quantity = parseInt(cartItem.quantity) + quantity;
      window.alert("Votre produit a été ajouté au panier");
    } else {
      window.alert(
        "Vous ne pouvez commander que 100 exemplaires d'un même canapé"
      );
    }
  } else {
    // Sinon ajouter le produit dans le tableau du LocalStorage
    cartItems.push(productOptions);
    window.alert("Votre produit a été ajouté au panier");
  }
  localStorage.setItem("products", JSON.stringify(cartItems)); // Envoie du tableau dans le LocalStorage
});
