const BASE_URL = "https://fakestoreapi.com";

export const GET_ALL_PRODUCTS_KEY = "allProducts";

export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

export const GET_PRODUCT_KEY = "product";

export const getProduct = async (productId: number) => {
  const res = await fetch(`${BASE_URL}/products/${productId}`);
  return res.json();
};
