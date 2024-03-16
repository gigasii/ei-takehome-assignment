export type ProductItem = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CartItem = {
  id: number;
  image: string;
  title: string;

  price: number;
  quantity: number;
};
