"use client";

import { useStore } from "@/utils/store";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { roundToDecimals } from "@/utils/mathRound";

export default function CheckOutBtn() {
  const searchParams = useSearchParams();

  const { bag, cartTotal } = useStore();

  const handlePayment = () => {};

  useEffect(() => {}, []);

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
