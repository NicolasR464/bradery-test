import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const item = await req.json();

  console.log(item);

  try {
    const createOrder = await prisma.carts.create({
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
  } catch (err) {
    return NextResponse.json(
      { response: "something went wrong" },
      { status: 500 }
    );
  }
}
