// récupération du tableau des canapés dans l'API

<<<<<<< HEAD
import { fetchData } from "./utils/fetch.js";

// récupération du lien de l'API

const urlcanapes = "http://localhost:3000/api/products";
=======
import { fetchData } from "./utils/fetch.js"

// récupération du lien de l'API

const urlcanapes = 'http://localhost:3000/api/products'

>>>>>>> 9254583c32a8dca340f20ad20aa992833a90f566

// Création et affichage des données de chaque canapé avec map dans le DOM

const displayCanapes = async () => {
<<<<<<< HEAD
  const tableauCanapes = await fetchData(urlcanapes);
  const carte = document.querySelector("#items");
  tableauCanapes.map((canape) => {
    const link = document.createElement("a");
    link.setAttribute("href", `./product.html?id=${canape._id}`);
    carte.appendChild(link);
    const article = document.createElement("article");
    link.appendChild(article);
    const image = new Image();
    image.setAttribute("src", canape.imageUrl);
    image.setAttribute("alt", canape.altTxt);
    article.appendChild(image);
    const name = document.createElement("h3");
    name.innerHTML = canape.name;
    name.classList.add("productName");
    article.appendChild(name);
    const description = document.createElement("p");
    description.innerHTML = canape.description;
    description.classList.add("productDescription");
    article.appendChild(description);
  });
};

displayCanapes();
=======
  const tableauCanapes = await fetchData(urlcanapes)
  const carte = document.querySelector('#items')
  tableauCanapes.map(canape => {
    const link = document.createElement('a')
    link.setAttribute('href', `./product.html?id=${canape._id}`)
    carte.appendChild(link)
    const article = document.createElement('article')
    link.appendChild(article)
    const image = new Image
    image.setAttribute('src', canape.imageUrl)
    image.setAttribute('alt', canape.altTxt)
    article.appendChild(image)
    const name = document.createElement('h3')
    name.innerHTML = canape.name
    name.setAttribute('class', 'productName')
    article.appendChild(name)
    const description = document.createElement('p')
    description.innerHTML = canape.description
    description.setAttribute('class', 'productDescription')
    article.appendChild(description)
  })
}

displayCanapes()
>>>>>>> 9254583c32a8dca340f20ad20aa992833a90f566