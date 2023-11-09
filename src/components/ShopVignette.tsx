"use client";

import AddToCartBtn from "./AddToCartBtn";
import { Product } from "../app/interfaces";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ShopVignette({
  productData,
}: {
  productData: Product;
}) {
  const [product, setProduct] = useState<Product>();
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  useEffect(() => {
    if (productData) setProduct(productData);
  }, [productData]);

  return (
    <>
      {product && (
        <article
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="flex flex-col"
          data-stripe={product.stripe_id}
        >
          <div className="relative w-fit">
            {isHovering && <AddToCartBtn productData={product} />}
            <Image
              className={
                isHovering
                  ? "rounded-sm z-20 opacity-70 transition-opacity"
                  : "rounded-sm z-20 opacity-100 transition-opacity"
              }
              width={200}
              height={200}
              src={product.img_url!}
              alt={`${product.name} banner image`}
            />
          </div>
          <div className="flex">
            <span>{product.name}</span>
            <span>{+product.price + "€"}</span>
          </div>
        </article>
      )}
    </>
  );
}
