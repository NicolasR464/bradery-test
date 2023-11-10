"use client";
import { useStore } from "@/utils/store";
import { useState, useEffect, useRef } from "react";
import CheckOutBtn from "@/components/Cart/CheckOutBtn";
import CartVignette from "@/components/Cart/CartVignette";

export default function CartDrawer() {
  const { bag, isCartOpen } = useStore();
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        isCartOpen &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        useStore.setState(() => ({ isCartOpen: false }));
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isCartOpen]);

  const drawerAnimation: React.CSSProperties = isCartOpen
    ? {
        borderLeft: "1px solid rgba(118, 118, 118, 0.471)",
        transform: "translateX(0px)",
      }
    : { transform: "translateX(100%)" };

  return (
    <div className="fixed z-50 top-0 right-0">
      <div ref={inputRef} className="relative cart max-w-screen z-40">
        <div
          style={drawerAnimation}
          className="overflow-x-hidden drawer cart-drawer transition-all duration-1000 w-screen  translate-x-full border-2  h-screen z-50 tablet:max-w-sm absolute top-0 right-0 backdrop-blur-lg"
        >
          <div className="mt-14 flex w-full flex-col justify-between min-w-[384px] ">
            <button
              onClick={() => {
                useStore.setState((state) => ({
                  isCartOpen: !state.isCartOpen,
                }));
              }}
              className="link absolute top-3 left-3"
            >
              close
            </button>
            <h2 className="text-center tracking-wider text-4xl ">your bag</h2>
            <div className="max-h-[80vh] overflow-scroll">
              {bag.map((_, i) => (
                <CartVignette index={i} key={i} />
              ))}
            </div>

            {/* <CheckOutBtn /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
