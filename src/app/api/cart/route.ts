import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { CartItem } from "@/utils/interfaces";

export async function POST(req: NextRequest) {
  console.log("🔥 POST");

  const item: CartItem = await req.json();
  console.log(item);

  try {
    console.log("trying");

    const cartExists = await prisma.carts.findFirst({
      where: {
        user_id: 1,
      },
    });
    console.log("first find");

    console.log({ cartExists });

    if (!cartExists) {
      console.log("doesnt exists");

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
      console.log(addToCart);

      return NextResponse.json(
        { response: "new cart created", data: addToCart },
        { status: 201 }
      );
    } else {
      const updatedCart = await prisma.carts.update({
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
