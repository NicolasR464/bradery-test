import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { CartItem } from "@/utils/interfaces";

export async function POST(req: NextRequest) {
  const item: CartItem = await req.json();

  console.log(item);

  try {
    const cartExists = await prisma.carts.findFirst({
      where: {
        user_id: 1,
      },
    });

    // console.log({ cartExists });

    if (!cartExists) {
      const addToCart = await prisma.carts.create({
        data: {
          user_id: 1,
          CartItems: {
            create: [
              {
                product_id: item.product.id,
                quantity: item.quantity,
              },
            ],
          },
        },
      });

      return NextResponse.json(
        { response: "new cart created", data: addToCart },
        { status: 201 }
      );
    } else {
      const existingProdInCart = await prisma.cartItems.findFirst({
        where: {
          cart_id: cartExists.id,
          product_id: item.product.id,
        },
      });

      // console.log({ existingProdInCart });
      let updatedCart;
      if (existingProdInCart) {
        updatedCart = await prisma.cartItems.update({
          where: {
            id: existingProdInCart.id,
          },
          data: {
            quantity: item.quantity,
          },
        });
      } else {
        updatedCart = await prisma.carts.update({
          where: {
            id: cartExists.id,
          },
          data: {
            CartItems: {
              create: [
                {
                  product_id: item.product.id,
                  quantity: item.quantity,
                },
              ],
            },
          },
        });
      }

      return NextResponse.json(
        { response: "cart updated", data: updatedCart },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json(
      { response: "something went wrong" },
      { status: 500 }
    );
  }
}
