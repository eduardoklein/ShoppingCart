import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function')
  });
  it('fetch é chamado quando o parametro "MLB1405519561" é passado', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalled();
  });
  it('fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1405519561"', async () => {
    await fetchProduct('MLB1405519561');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });
  it('the function will return a data structure, equal to the object "product" imported on the file', async () =>{
    expect(await fetchProduct('MLB1405519561')).toStrictEqual(product);
  })
  it('when fetchProduct is called without a argument, the function returns a error', async () => {
    const response = await fetchProduct();
    expect(response).toEqual(new Error('Termo de busca não informado'));
  })
});
