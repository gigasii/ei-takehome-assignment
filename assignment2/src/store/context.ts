import { createContext, Dispatch, SetStateAction } from "react";
import { CartItem } from "../types/store";

export type CartContextType = {
  cartItems: Record<number, CartItem>; // Key - product id, value - Other product info
  setCartItems: Dispatch<SetStateAction<Record<number, CartItem>>>;
};

export const CART_ITEM_STORAGE_KEY = "cart";

export const CartContext = createContext<CartContextType>({
  cartItems: {},
  setCartItems: (state) => {},
});
