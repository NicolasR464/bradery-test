"use client";

import { useEffect, useState } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Product } from "../utils/interfaces";
import { postCart } from "../utils/cartCrud";
import { useStore } from "@/utils/store";
import { Button } from "@nextui-org/button";

const addProdOnClick = async (product: Product) => {
  const crudRes = await postCart({ product, quantity: 1 });
  console.log({ product });

  //   console.log({ crudRes });

  if (crudRes !== 500) {
    // state management for cart update
    useStore.setState((state) => ({
      isCartOpen: true,
      bag: [...state.bag, { product, quantity: 1 }],
      cartTotal: state.cartTotal + product.price,
    }));
  }
};

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
        onClick={() => addProdOnClick(product)}
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
