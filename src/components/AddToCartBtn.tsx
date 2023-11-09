"use client";

import { useEffect, useState } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Product } from "../app/interfaces";
import { postCart } from "../utils/cartCrud";

export default function AddToCartBtn({
  productData,
}: {
  productData: Product;
}) {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    if (productData) setProduct(productData);
  }, [productData]);

  if (product && product?.inventory > 0) {
    return (
      <TbShoppingBagPlus
        onClick={() => postCart(product)}
        className="absolute top-[50%] left-[50%] -translate-x-[50%]  text-5xl text-[#143F47]  z-10 hover:text-[#26b523] transition-colors cursor-pointer  "
      />
    );
  } else {
    return (
      <span className="absolute top-[50%] left-[50%] -translate-x-[50%] ">
        sold out!
      </span>
    );
  }
}
