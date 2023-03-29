import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');

const getData = async () => {
  const response = await fetchProductsList('computador');
  const data = await response.json();
  return data;
};

const productList = async () => {
  const resolve = await getData();
  const data = Object.values(resolve);
  const arrayOfProducts = data[4];
  return arrayOfProducts;
};

const elementCreate = async () => {
  const arrayOfProducts = await productList();
  arrayOfProducts.forEach((element) => {
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
