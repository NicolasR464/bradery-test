"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useStore } from "@/utils/store";
import NumSelector from "./NumSelector";

export default function CartVignette({ index }: { index: number }) {
  const [isAdded, setIsAdded] = useState(false);
  const [id, setId] = useState("");
  const [stripeProdId, setStripeProductId] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState(0);
  const [collection, setCollection] = useState("");
  const [printLeft, setPrintLeft] = useState(0);
  const [amountSelected, setAmountSelected] = useState(1);

  const { bag } = useStore();
  console.log("🔥");
  console.log(bag);
  console.log("🔥🔥");
  console.log(bag[index]);

  // useEffect(() => {
  //   setId(item.id);
  // }, [item.id]);

  // useEffect(() => {
  //   setStripeProductId(item.stripeId);
  // }, [item.stripeId]);

  // useEffect(() => {
  //   setImg(item.img);
  // }, [item.img, img]);

  // useEffect(() => {
  //   setPrice(item.price);
  // }, [item.price]);

  // useEffect(() => {
  //   setCollection(item.collection);
  // }, [item.collection]);

  // useEffect(() => {
  //   setPrintLeft(item.prints_left);
  // }, [item.prints_left]);

  // useEffect(() => {
  //   setAmountSelected(item.amount_selected);
  // }, [item.amount_selected]);

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
        (acc, item) => acc + amountSelected * item.product.price,
        0
      );
      return { cartTotal: updateTotal };
    });
  };

  return (
    <article className="flex p-2 m-2 rounded-xl justify-center   border-solid border-2  tablet:flex-row">
      <section className="flex justify-center flex-col   items-center">
        <span>{collection}</span>
        <span>{price}€/unité</span>
        <div className="form-control w-full max-w-xs">
          <NumSelector index />
          {/* <select
            onChange={(e) => changeSelecNum(e.target.value)}
            className="select select-bordered  w-full max-w-xs"
          >
            {Array(printLeft)
              .fill(null)
              .map((_, x) => (
                <option selected={x + 1 === amountSelected} key={x}>
                  {x + 1}
                </option>
              ))}
          </select> */}
          <button onClick={removeItem} className="underline">
            retirer
          </button>
        </div>
      </section>
      <section className="m-2 flex justify-center   items-center">
        {img && (
          <Image
            style={{
              boxShadow:
                "12px 12px 24px 0 rgba(0, 0, 0, 0.2), -12px -12px 24px 0 rgba(255, 255, 255, 0.5)",
            }}
            className="m-1 rounded-lg"
            src={img}
            width={150}
            height={150}
            alt="Drawing image in cart section"
          />
        )}
      </section>
    </article>
  );
}
