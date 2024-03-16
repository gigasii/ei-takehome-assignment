export type CartItem = {
  image: string;
  title: string;
  price: number;
  quantity: number;
};

export type AddToCart = Omit<CartItem & { id: number }, "quantity">;
