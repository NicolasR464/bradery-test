import { Decimal } from "@prisma/client/runtime/library";

export interface Product {
  name: string;
  price: Decimal;
  img_url: string | null;
  stripe_id: string;
}

export interface BrandData {
  id: number;
  name: string;
  main_img_url: string | null;
  font_title: string | null;
  Products: Product[];
}
