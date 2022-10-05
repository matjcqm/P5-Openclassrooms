export const fetchData = async (url) => {
    const response = await fetch(url)
    const objData = await response.json()
    return objData
  }