import { createContext, Dispatch, SetStateAction } from "react";
import { CartItem } from "../types/store";

type CartContextType = {
  cartItems: Record<number, CartItem>; // Key - product id, value - Other product info
  setCartItems: Dispatch<SetStateAction<Record<number, CartItem>>>;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);
