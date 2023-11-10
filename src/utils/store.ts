import { create } from "zustand";
import { Product } from "./interfaces";

export const useStore = create<{
  isCartOpen: Boolean;
  bag: Product[];
  cartTotal: number;
}>(() => ({ isCartOpen: false, bag: [], cartTotal: 0 }));
