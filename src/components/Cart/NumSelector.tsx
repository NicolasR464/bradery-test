"use client";
import { LuMinus, LuPlus } from "react-icons/lu";
import { NumSelectorParam } from "@/utils/interfaces";
import { useState, useEffect } from "react";
import { useStore } from "@/utils/store";
import { Input } from "@nextui-org/react";
import { useDebouncedState } from "@mantine/hooks";
import { postCart } from "@/utils/cartCrud";

export default function NumSelector({ index }: { index: number }) {
  const { bag } = useStore();

  const [amount, setAmount] = useState<number>(bag[index].quantity);
  const [amountDebounce, setAmountDebounce] = useDebouncedState(index, 500);

  useEffect(() => {
    setAmount(bag[index].quantity);
  }, [bag, index]);

  const changeStore = async () => {
    const crudRes = await postCart({
      product: bag[index].product,
      quantity: amount,
    });
    if (crudRes !== 500) {
      useStore.setState((state) => {
        const updatedBag = state.bag.map((obj) =>
          obj.product.id === bag[index].product.id
            ? { ...obj, quantity: amount }
            : obj
        );

        const updatedTotal = updatedBag.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        );

        return { bag: updatedBag, cartTotal: updatedTotal };
      });
    } else {
      console.log("Something went wrong.");
    }
  };

  useEffect(() => {
    setAmountDebounce(amount);
  }, [amount, setAmountDebounce]);

  useEffect(() => {
    changeStore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amountDebounce]);

  return (
    <div className="flex justify-center items-center border-2 border-second p-2 rounded-xl">
      <LuMinus
        className={amount > 0 ? "cursor-pointer" : "cursor-not-allowed"}
        onClick={() => setAmount(amount != 0 ? amount - 1 : 0)}
      />
      <span className="p-3">{amount}</span>
      <LuPlus
        className={
          bag[index].product.inventory > amount
            ? "cursor-pointer"
            : "cursor-not-allowed"
        }
        onClick={() =>
          setAmount(bag[index].product.inventory > amount ? amount + 1 : amount)
        }
      />
    </div>
  );
}
