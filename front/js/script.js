const todo = fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.status + " " + res.statusText);
  })
  .catch(err => {
    console.error(`Network request fail !!\n${ err }`);
  });
export default await todo;




// récupération du tableau des canapés dans l'API

import { fetchData } from "./utils/fetch.js";

// récupération du lien de l'API

const urlcanapes = "http://localhost:3000/api/products";

// Création et affichage des données de chaque canapé avec map dans le DOM

// displayCanapes = async () => {
function getProductsHtml(canape) {
  return `<a href="./product.html?id=${canape._id}">
            <article>
              <img src="${canape.imageUrl}" alt="${canape.altTxt}">
              <h3 class="productName">${canape.name}</h3>
              <p class="productDescription">${canape.description}</p>
            </article>
          </a>`;
}

fetchData(urlcanapes)
  .then((tableauCanapes) => {
    const carte = document.querySelector("#items");
    let html = "";
    tableauCanapes.map((canape) => {
      html += getProductsHtml(canape);
    });
    carte.innerHTML = html;
  })
  .catch((error) => {
    document.querySelector(".titles").innerHTML = "<h1>Erreur 404</h1>";
    console.log(error);
  });

  
// fetchData(urlcanapes)
//   .then((tableauCanapes) => {
//     const carte = document.querySelector("#items");
//     tableauCanapes.map((canape) => {
//       const link = document.createElement("a");
//       link.setAttribute("href", `./product.html?id=${canape._id}`);
//       carte.appendChild(link);
//       const article = document.createElement("article");
//       link.appendChild(article);
//       const image = new Image();
//       image.setAttribute("src", canape.imageUrl);
//       image.setAttribute("alt", canape.altTxt);
//       article.appendChild(image);
//       const name = document.createElement("h3");
//       name.innerText = canape.name;
//       name.classList.add("productName");
//       article.appendChild(name);
//       const description = document.createElement("p");
//       description.innerText = canape.description;
//       description.classList.add("productDescription");
//       article.appendChild(description);
//     });
//   })
//   .catch((error) => {
//     document.querySelector(".titles").innerHTML = "<h1>Erreur 404</h1>";
//     console.log(error);
//   });
// };

// displayCanapes();
