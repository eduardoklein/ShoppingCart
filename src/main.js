import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');
const loading = document.createElement('span');
console.log(loading);

const loadingCreate = () => {
  loading.className = 'loading';
  loading.innerHTML = 'carregando...';
  products.appendChild(loading);
  console.log(loading);
};

const loadingRemove = () => loading.remove();

const elementCreate = async () => {
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
};

window.addEventListener('load', elementCreate);

window.addEventListener('click', loadingCreate);

window.addEventListener('load', () => {
  loadingCreate();
  elementCreate();
});
