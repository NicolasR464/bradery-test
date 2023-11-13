import { create } from "zustand";
import { CartItem } from "./interfaces";

export const useStore = create<{
  cartId: number;
  isCartOpen: Boolean;
  bag: CartItem[];
  cartTotal: number;
}>(() => ({ cartId: 0, isCartOpen: false, bag: [], cartTotal: 0 }));
