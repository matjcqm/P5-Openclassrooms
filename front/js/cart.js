// Récupération d'un tableau depuis l'URL d'une API
import { fetchData } from "./utils/fetch.js";

// Récupération du lien de l'API
const urlcanapes = "http://localhost:3000/api/products";

// Récupération du tableau du LocalStorage
let canapesCart = JSON.parse(localStorage.getItem("products")) ?? [];

// Création des constantes et variables utiles pour la suite
const priceArray = [];
const initValue = 0;
const quantityHtml = document.querySelector("#totalQuantity");
let totalQuantity = 0;

// Fonction View, qui permet d'afficher l'HTML pour un produit du panier
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

// Utilisation de la fonction importée avec l'URL de l'API
fetchData(urlcanapes).then((canapesApi) => {
  const cartCard = document.querySelector("#cart__items");
  let html = "";
  // Création d'une carte HTML avec la fonction View pour CHAQUE canapé se trouvant dans le panier
  if (canapesCart.length) {
    canapesCart.map((item) => {
      // Utilisation de find pour comparer l'ID du LS avec celui de l'API pour récupérer toutes les infos
      const canape = canapesApi.find(
        (canapId) => canapId._id == item.idProduct
      );
      // products.push(item.idProduct);

      // Multiplication du tarif par le nombre de quantité de chaque canapé + le Push
      html += getCartHtml(item, canape);
      priceArray.push(canape.price * item.quantity);
    });
    cartCard.innerHTML = html;
    // Affichage d'un message si le panier est vide
  } else {
    cartCard.innerHTML = "<h1>est vide</h1>";
  }
  getTotalQuantity();
  const total = sum(priceArray);
  cartSomme(total);
  const deleteBtns = document.querySelectorAll(".deleteItem");
  for (const btn of deleteBtns) {
    btn.onclick = deleteItem;
  }
  const itemQuantity = document.querySelectorAll(".itemQuantity");
  for (const quantity of itemQuantity) {
    quantity.onchange = changeQuantity;
  }
});

// Calcul de la quantité du panier
const getTotalQuantity = () => {
  if (canapesCart) {
    canapesCart.forEach((item) => {
      totalQuantity += item.quantity;
    });
    return (quantityHtml.innerText = totalQuantity);
  } else {
    return (quantityHtml.innerText = "0");
  }
};

// Fonction pour faire la somme d'un tableau
const sum = (array) => {
  const result = array.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initValue
  );
  return result;
};

// Affichage de la somme du panier
const cartSomme = (total) => {
  const priceHtml = document.querySelector("#totalPrice");
  if (canapesCart) {
    return (priceHtml.innerText = total);
  } else {
    return (priceHtml.innerText = "0");
  }
};

// Function du bouton Supprimer
function deleteItem(event) {
  let article = event.target.closest("article");
  window.confirm("Voulez-vous vraiment supprimer cet article");
  const result = canapesCart.filter(
    (el) =>
      el.idProduct !== article.dataset.id || el.color !== article.dataset.color
  );
  localStorage.products = JSON.stringify(result);
  window.location.reload();
}

// Fonction changement de quantité
function changeQuantity(event) {
  let newQuantity = parseInt(event.target.value);
  if (newQuantity > 0 && newQuantity < 101) {
    let article = event.target.closest("article");
    let result = canapesCart.find((el) => {
      return (
        el.idProduct === article.dataset.id &&
        el.color === article.dataset.color
      );
    });
    console.log(result);
    result.quantity = newQuantity;
    localStorage.products = JSON.stringify(canapesCart);
    window.location.reload();
  } else {
    window.alert("ERREUR");
  }
}

// Message d'alerte si passage d'une commande vide
// const order = document.querySelector("#order");
// order.addEventListener("click", function () {
//   if (!canapesCart) {
//     window.alert("Votre panier est vide");
//   }
// });

// Déclaration des variables pour l'utilision des regex
const form = document.querySelector(".cart__order__form");

// Création de la variable contact pour pouvoir récuperer les input et les insérer dans le tableau à envoyer
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

// Création d'un tableau dans lequel on envoie les champs si le test des Regex est OK
let regexOk = [];

// Création des regex
const regex = {
  firstName: new RegExp("(^[a-zA-Zéè -]{2,20}$)"),
  lastName: new RegExp("(^[a-zA-Z -]{2,30}$)"),
  address: new RegExp("(^[a-zA-Zéè 0-9,-]{4,50}$)"),
  city: new RegExp("(^[a-zA-Zàéè -]{4,30}$)"),
  email: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
};

// Boucle pour tester chaque éléments du formulaire
for (let element of form) {
  element.onchange = () => {
    testRegex(element, regex[element.id], element.id);
  };
}

// const dataForm = Object.fromEntries(new FormData(form));
// console.log(dataForm);

// Fonction pour vérifier les inputs par rapport aux regex et les insérer dans la variable contact
const testRegex = (element, regex, id) => {
  if (regex.test(element.value)) {
    if (!regexOk.includes(element.id)) {
      regexOk.push(element.id);
    }
    contact[id] = element.value;
    document.querySelector(`#${id}ErrorMsg`).innerText = "";
  } else {
    if (regexOk.includes(element.id)) {
      regexOk.splice(regexOk.indexOf(element.id), 1);
    }
    document.querySelector(
      `#${id}ErrorMsg`
    ).innerText = `L'information ${id} n'est pas valide`;
  }
};

// fonction de récupération des ID du panier (à mettre dans la fonction du bouton submit)
let products = [];
canapesCart.map((canape) => {
  products.push(canape.idProduct);
});

// Suppression des ID en double dans le tableau
products = [...new Set(products)];

// Création du tableau à envoyer
let data = {
  contact,
  products,
};

form.addEventListener("submit", submit);

// Fonction du bouton Submit pour envoyer le formulaire
function submit(event) {
  event.preventDefault();
  // Vérification si il y a quelquechose dans le panier
  if (canapesCart.length != 0) {
    // Si notre tableau comporte les 5 champs OK, on passe à la suite
    if (regexOk.length == 5) {
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // Vide le localStorage
          localStorage.clear();
          // Ouvre la page de confirmation avec le numéro de commande dans l'URL
          window.location.href = `../html/confirmation.html?order_id=${data.orderId}`;
        });
    } else {
      window.alert("Un champ est invalide");
    }
  } else {
    window.alert("Votre panier est vide");
  }
}

// ANCIEN CODE

// const displayCart = async () => {
// const tableauCanapes = await fetchData(urlcanapes); //Tableau des canapés de l'API
// const cartCard = document.querySelector("#cart__items");
// if (cartTableau) {
//   cartTableau.map((item) => {
//     const canape = tableauCanapes.find(
//       (idCanap) => idCanap._id == item.idProduct
//     );
//   const article = document.createElement("article");
//   article.classList.add("cart__item");
//   article.setAttribute("data-id", item.idProduct);
//   article.setAttribute("data-color", item.color);
//   cartCard.appendChild(article);
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
//     cartCard.appendChild(text);
//   }
// };

// displayCart();
