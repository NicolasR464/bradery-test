"use client";
import { LuMinus, LuPlus } from "react-icons/lu";
import { NumSelectorParam } from "@/utils/interfaces";
import { useState, useEffect } from "react";
import { useStore } from "@/utils/store";

export default function NumSelector({ index }: { index: number }) {
  const [amount, setAmount] = useState<number>(index);
  //   console.log(prodInfo);

  const { bag } = useStore();
  useEffect(() => {
    console.log(bag[index].quantity);
  }, [amount, bag, index]);

  console.log("in num selector component 💥");

  console.log({ index });

  console.log(bag[index]);

  const changeSelecNum = (n: number) => {
    setAmount(n);
    useStore.setState((state) => {
      const updatedBag = state.bag.map((obj) =>
        obj.product.id === bag[index].product.id
          ? { ...obj, amount_selected: n }
          : obj
      );

      const updatedTotal = updatedBag.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
      );

      return { bag: updatedBag, cartTotal: updatedTotal };
    });
  };

  return (
    <div className="flex justify-center items-center border-2 border-second p-2 rounded-xl">
      <LuMinus
        className="cursor-pointer"
        onClick={() => changeSelecNum(amount - 1)}
      />
      <span className="p-3">{amount}</span>
      <LuPlus
        className="cursor-pointer"
        onClick={() => changeSelecNum(amount + 1)}
      />
    </div>
  );
}
