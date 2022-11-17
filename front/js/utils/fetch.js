//Export de la fonction Fetch pour pouvoir l'utiliser sur toutes les pages
export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw Error("HTTP " + response.status + " " + response.statusText);
  }
  const objData = await response.json();
  return objData;
};
