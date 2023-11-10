export interface Product {
  id: number;
  name: string;
  price: any;
  img_url: string | null;
  stripe_id: string;
  inventory: number;
}

export interface BrandData {
  id: number;
  name: string;
  main_img_url: string | null;
  font_title: string | null;
  Products: Product[];
}

export interface NumSelectorParam {
  id: number;
  amountSelected: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
