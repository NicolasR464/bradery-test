"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/utils/store";
import NumSelector from "./NumSelector";

export default function CartVignette({ index }: { index: number }) {
  const { bag } = useStore();

  const removeItem = () => {
    useStore.setState((state) => ({
      bag: [
        ...state.bag.filter((el) => el.product.id !== bag[index].product.id),
      ],
    }));
    useStore.setState((state) => ({
      isCartOpen: state.bag.length === 0 ? false : state.isCartOpen,
    }));
    useStore.setState((state) => {
      const updateTotal = state.bag.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );
      return { cartTotal: updateTotal };
    });
  };

  return (
    <article className="flex p-2 m-2 rounded-xl justify-center   border-solid border-2 border-second tablet:flex-row">
      <section className="flex justify-center flex-col   items-center">
        <span>{bag[index].product.name}</span>
        <span>{bag[index].product.price}€/unité</span>
        <div className="form-control w-full max-w-xs">
          <NumSelector index={index} />

          <button onClick={removeItem} className="underline">
            retirer
          </button>
        </div>
      </section>
      <section className="m-2 flex justify-center   items-center">
        {bag[index].product && (
          <Image
            style={{
              boxShadow:
                "12px 12px 24px 0 rgba(0, 0, 0, 0.2), -12px -12px 24px 0 rgba(255, 255, 255, 0.5)",
            }}
            className="m-1 rounded-lg"
            src={bag[index].product.img_url!}
            width={150}
            height={150}
            alt="Drawing image in cart section"
          />
        )}
      </section>
    </article>
  );
}
