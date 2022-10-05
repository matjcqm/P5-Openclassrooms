// récupération du tableau du canapés dans l'API

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