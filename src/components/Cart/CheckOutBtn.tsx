"use client";

import { useRouter } from "next/navigation";

import { useStore } from "@/utils/store";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roundToDecimals } from "@/utils/mathRound";
import { postOrder } from "@/utils/cartCrud";

export default function CheckOutBtn() {
  const searchParams = useSearchParams();

  const { bag, cartTotal } = useStore();
  const router = useRouter();
  const handlePayment = async () => {
    const orderRes: any = await postOrder(bag);
    console.log(orderRes);
    if (orderRes.status == 201) {
      useStore.setState(() => ({ bag: [], cartTotal: 0, isCartOpen: false }));
      router.push("/success");
    }
  };

  return (
    <button
      onClick={() => handlePayment()}
      className="btn flex flex-row justify-center items-center btn-success btn-outline m-4  mb-6 border-solid border-2 border-second rounded-md p-3"
    >
      <span>checkout&nbsp;</span>{" "}
      {<span className="text-xs">(total: {roundToDecimals(cartTotal)}€ )</span>}
    </button>
  );
}
