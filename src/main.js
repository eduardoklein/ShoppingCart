import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');
const loading = document.createElement('span');

const loadingCreate = () => {
  loading.className = 'loading';
  loading.innerHTML = 'carregando...';
  products.appendChild(loading);
};

const loadingRemove = () => loading.remove();

const elementCreate = async () => {
  try {
    const data = await fetchProductsList('computador');
    loadingRemove();
    data.forEach((element) => {
      const obj = {
        id: element.id,
        title: element.title,
        thumbnail: element.thumbnail,
        price: element.price,
      };
      const section = createProductElement(obj);
      products.appendChild(section);
    });
  } catch (error) {
    loadingRemove();
    const errorElement = document.createElement('span');
    errorElement.className = 'error';
    errorElement.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
    products.appendChild(errorElement);
  }
};

window.addEventListener('load', () => {
  loadingCreate();
  elementCreate();
});
