import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Product } from "../../../app/interfaces";

export async function POST(req: NextRequest) {
  console.log("🔥 POST");

  const productData: Product = await req.json();
  //   console.log(productData);

  // first check if the user already has a cart

  try {
    const cartExists = await prisma.cart.findFirst({
      where: {
        user_id: 1,
      },
    });
    console.log({ cartExists });

    if (!cartExists) {
      const addToCart = await prisma.cart.create({
        data: {
          user_id: 1,
          CartItems: {
            create: [
              {
                product_id: productData.id,
                quantity: 1,
              },
            ],
          },
        },
      });
      console.log(addToCart);

      return NextResponse.json(
        { response: "new cart created", data: addToCart },
        { status: 201 }
      );
    } else {
      const updatedCart = await prisma.cart.update({
        where: {
          id: cartExists.id,
        },
        data: {
          CartItems: {
            create: [
              {
                product_id: productData.id,
                quantity: 1,
              },
            ],
          },
        },
      });

      console.log(updatedCart);
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
