export const fetchProduct = () => {
  // seu código aqui
};

export const fetchProductsList = async (query) => {
  try {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${query}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return new Error('Termo de busca não informado');
  }
};
