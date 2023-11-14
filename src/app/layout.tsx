import type { Metadata } from "next";
import { Inter, Junge, Lobster_Two } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CartDrawer from "@/components/Cart/CartDrawer";
import { useStore } from "@/utils/store";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { CartItem } from "@/utils/interfaces";
import Link from "next/link";

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

  const cartInfo: CartItem[] = productsDetails.map((product, index) => ({
    product,
    quantity: cartData?.CartItems[index].quantity!,
  }));

  useStore.setState(() => ({ bag: cartInfo, cartTotal: 1 }));
} catch (err) {
  console.error(err);
} finally {
  async () => {
    await prisma.$disconnect();
  };
}

const inter = Inter({ subsets: ["latin"] });
const lobster = Lobster_Two({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lobster",
});
const junge = Junge({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-junge",
});

export const metadata: Metadata = {
  title: "Vitrine",
  description: "1,2,1,2 This is a tech test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {" "}
        <Providers>
          <CartDrawer />
          <div className="flex w-screen justify-center">
            <Link
              href="/"
              className={(junge.className, "text-center text-4xl")}
            >
              vitrine
            </Link>
          </div>
          {children}{" "}
        </Providers>
      </body>
    </html>
  );
}
