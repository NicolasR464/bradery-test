"use client";
import { LuMinus, LuPlus } from "react-icons/lu";
import { NumSelectorParam } from "@/utils/interfaces";
import { useState } from "react";
import { useStore } from "@/utils/store";

export default function NumSelector({ index }: { index: any }) {
  //   const [amount, setAmount] = useState<number>(prodInfo.amountSelected);
  //   console.log(prodInfo);

  const { bag } = useStore();
  console.log("in num selector component 💥");

  console.log(bag[index]);

  const changeSelecNum = (n: number) => {
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
    <div className="flex border-red-900">
      <LuMinus onClick={() => changeSelecNum(bag[index].quantity - 1)} />
      <input type="number" name="number" id="product_num" value={1} />
      <LuPlus onClick={() => changeSelecNum(bag[index].quantity + 1)} />
    </div>
  );
}
