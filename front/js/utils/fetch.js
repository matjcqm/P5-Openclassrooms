export const fetchData = async (url) => {
    const response = await fetch(url)
    if(!response.ok){
      throw Error('HTTP ' + response.status + ' ' + response.statusText)
    }
    const objData = await response.json()
    return objData
  }

// export const getAllProducts = async () => {
//   const response = await fetch("http://localhost:3000/api/products")

// }