import { create } from "zustand";
import { CartItem } from "./interfaces";

export const useStore = create<{
  isCartOpen: Boolean;
  bag: CartItem[];
  cartTotal: number;
}>(() => ({ isCartOpen: false, bag: [], cartTotal: 0 }));
