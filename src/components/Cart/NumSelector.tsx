"use client";
import { LuMinus, LuPlus } from "react-icons/lu";
import { NumSelectorParam } from "@/utils/interfaces";
import { useState, useEffect } from "react";
import { useStore } from "@/utils/store";
import { Input } from "@nextui-org/react";
import { useDebouncedState } from "@mantine/hooks";

export default function NumSelector({ index }: { index: number }) {
  const [amount, setAmount] = useState<number>(index);
  const [amountDebounce, setAmountDebounce] = useDebouncedState(index, 500);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkInventory = (n: number) => {
    console.log("let's check inventory");
  };

  useEffect(() => {
    setAmountDebounce(amount);
  }, [amount, setAmountDebounce]);

  useEffect(() => {
    checkInventory(amountDebounce);
  }, [amountDebounce]);

  const { bag } = useStore();

  const changeStore = () => {
    useStore.setState((state) => {
      const updatedBag = state.bag.map((obj) =>
        obj.product.id === bag[index].product.id
          ? { ...obj, amount_selected: amount }
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
        onClick={() => setAmount(amount - 1)}
      />
      <span className="p-3">{amount}</span>
      <LuPlus
        className="cursor-pointer"
        onClick={() => setAmount(amount + 1)}
      />
    </div>
  );
}
