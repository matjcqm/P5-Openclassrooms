// récupération du lien de l'API

const urlcanapes = 'http://localhost:3000/api/products'


// récupération du tableau des canapés dans l'API

const fetchData = async (url) => {
  const response = await fetch(url)
  const tableauCanapes = await response.json()
  return tableauCanapes
}


// Création et affichage des données de chaque canapé avec map

const displayCanapes = async () => {
  const tableauCanapes = await fetchData(urlcanapes)
  const carte = document.querySelector('#items')
  tableauCanapes.map(canape => {
    const link = document.createElement('a')
    const article = document.createElement('article')
    const image = document.createElement('img')
    const name = document.createElement('h3')
    const description = document.createElement('p')
    description.innerHTML = canape.description
    description.setAttribute('class', 'productDescription')
    name.innerHTML = canape.name
    name.setAttribute('class', 'productName')
    image.setAttribute('src', canape.imageUrl)
    image.setAttribute('alt', canape.altTxt)
    link.setAttribute('href', `./product.html?id=${canape._id}`)
    article.appendChild(name)
    article.appendChild(image)
    article.appendChild(description)
    link.appendChild(article)
    carte.appendChild(link)

  })
}

displayCanapes()