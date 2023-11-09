"use client";

import { useEffect, useState } from "react";

import { BiCartAdd } from "react-icons/bi";
import { Product } from "../app/interfaces";

const addToCart = (data: any) => {
  console.log(data);
};

export default function AddToCartBtn({
  productData,
}: {
  productData: Product;
}) {
  const [product, setProduct] = useState<Product>();
  console.log(productData);

  useEffect(() => {
    if (productData) setProduct(productData);
  }, [productData]);

  return (
    <BiCartAdd
      onClick={() => addToCart(product)}
      className="absolute   text-5xl text-[#143F47] "
    />
  );
}
