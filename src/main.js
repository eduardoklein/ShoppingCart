import { saveCartID, getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList, fetchProduct } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const products = document.querySelector('.products');
const loading = document.createElement('span');
const cartSection = document.querySelector('.cart__products');

const handleAddToCart = async (event) => {
  const productId = event.target.parentNode.childNodes[0].innerText;
  saveCartID(productId);
  const product = await fetchProduct(productId);
  const productObj = {
    id: product.id,
    title: product.title,
    price: product.price,
    pictures: product.pictures,
  };
  cartSection.appendChild(createCartProductElement(productObj));
};

const getCartLocalStorage = async () => {
  const arrayOfSavedCartIds = getSavedCartIDs();
  const promises = arrayOfSavedCartIds.map(async (id) => {
    const produto = await fetchProduct(id);
    return produto;
  });
  const resolvedPromises = await Promise.all(promises);
  resolvedPromises.forEach((product) => {
    const productObj = {
      id: product.id,
      title: product.title,
      price: product.price,
      pictures: product.pictures,
    };
    cartSection.appendChild(createCartProductElement(productObj));
  });
};

window.addEventListener('load', getCartLocalStorage);

const buttonAddEventListener = () => {
  const buttonAdd = document.querySelectorAll('.product__add');
  buttonAdd.forEach((button) => {
    button.addEventListener('click', handleAddToCart);
  });
};

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
    buttonAddEventListener();
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
