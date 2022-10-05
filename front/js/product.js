// récupération du tableau du canapés dans l'API

import { fetchData } from "./utils/fetch.js"

// récupération de l'ID du produit dans l'URL

const params = window.location.search
const idProduct = new URLSearchParams(params).get('id')

// récupération du lien de l'API lié au produit

const urlProduct =  `http://localhost:3000/api/products/${idProduct}`


// Création et affichage des données du produit dans le DOM
  
const displayProduct = async () => {
    const product = await fetchData(urlProduct)
    document.getElementsByClassName("item__img")[0].innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}" />`
    document.getElementById("title").innerHTML = `${product.name}`
    document.getElementById('price').innerHTML = `${product.price}`
    document.getElementById("description").innerHTML = `${product.description}` 
    const colorList = document.querySelector('#colors')

    // Boucle de création d'une balise 'option' par couleur sur le produit

    product.colors.map((colors) => {
        const optionColor = document.createElement('option')
        optionColor.innerHTML = colors
        colorList.appendChild(optionColor)
    })
}
displayProduct()


// Fonction du bouton ajouter au panier
const addCart = document.getElementById('addToCart')
addCart.addEventListener('click', function()  {
    const color = document.getElementById('colors').value
    const quantity = document.getElementById('quantity').value
    let cartTableau = JSON.parse(localStorage.getItem("products"))
    if (color === '' || quantity == 0) {
        window.alert('Veuillez choisir une couleur et une quantité')
    } else if (cartTableau == null) {
        cartTableau = []
        cartTableau.push(idProduct, color, quantity)
        localStorage.setItem('products', JSON.stringify(cartTableau))
        } else if (cartTableau != null) {
        
    }
    //envoi du localStorage avec les infos du produits
})