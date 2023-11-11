import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CartDrawer from "@/components/Cart/CartDrawer";
import { useStore } from "@/utils/store";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { CartItem } from "@/utils/interfaces";

try {
  const cartData = await prisma.carts.findFirst({
    where: { user_id: 1 },

    include: {
      CartItems: true,
    },
  });

  const productsCartInfo = cartData?.CartItems.map((item) => item.product_id);

  const productsDetails = await prisma.products.findMany({
    where: {
      id: {
        in: productsCartInfo,
      },
    },
  });
  console.log("product details:");

  console.log(productsDetails);

  const cartInfo: CartItem[] = productsDetails.map((product, index) => ({
    product,
    quantity: cartData?.CartItems[index].quantity!,
  }));

  console.log(cartInfo);

  useStore.setState(() => ({ bag: cartInfo, cartTotal: 1 }));
} catch (err) {
  console.error(err);
} finally {
  async () => {
    await prisma.$disconnect();
  };
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vitrine",
  description: "wow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {" "}
        <Providers>
          <CartDrawer />
          {children}{" "}
        </Providers>
      </body>
    </html>
  );
}
