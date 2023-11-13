"use client";
import { useEffect, useState } from "react";
import { TbShoppingBagPlus } from "react-icons/tb";
import { Product } from "../utils/interfaces";
import { postCart } from "../utils/cartCrud";
import { useStore } from "@/utils/store";
import { Button } from "@nextui-org/button";
import { LuSparkle } from "react-icons/lu";

export default function AddToCartBtn({
  productData,
}: {
  productData: Product;
}) {
  const [product, setProduct] = useState<Product>();
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const { bag } = useStore();

  useEffect(() => {
    if (productData) setProduct(productData);
  }, [productData]);

  const addProdOnClick = async (product: Product) => {
    const productInCart = bag.some((bag) => bag.product.id === product.id);

    setIsAddedToCart(true);

    const crudRes = await postCart({ product, quantity: 1 });
    // console.log({ product });
    console.log("🤞");

    console.log(crudRes);
    console.log(crudRes.data.cart_id);

    if (crudRes !== 500) {
      // state management for cart update
      let updateProductQuantity: any;
      if (productInCart) {
        updateProductQuantity = bag.map((bagItem) =>
          bagItem.product.id === product.id
            ? { ...bagItem, quantity: bagItem.quantity + 1 }
            : bagItem
        );
      }
      useStore.setState((state) => ({
        cartId: crudRes.data.cart_id,
        isCartOpen: true,
        bag: productInCart
          ? updateProductQuantity
          : [...state.bag, { product, quantity: 1 }],
        cartTotal: state.cartTotal + product.price,
      }));
    }
  };

  if (product && product?.inventory > 0 && !isAddedToCart) {
    return (
      <TbShoppingBagPlus
        onClick={() => addProdOnClick(product)}
        className="absolute top-[50%] left-[50%] -translate-x-[50%]  text-5xl text-[#143F47]  z-10 hover:text-[#26b523] transition-colors cursor-pointer  "
      />
    );
  } else if (product && product?.inventory > 0 && isAddedToCart) {
    return (
      <LuSparkle className="absolute top-[50%] left-[50%] -translate-x-[50%]  text-5xl text-[#143F47]  z-10 hover:text-[#26b523] transition-colors   " />
    );
  } else {
    return (
      <span className="absolute top-[50%] left-[50%] -translate-x-[50%] ">
        sold out!
      </span>
    );
  }
}
