import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const items: any = await req.json();

  try {
    const order = await prisma.orders.create({
      data: {
        user_id: 1,
        OrderItems: {
          createMany: {
            data: items.map((item: any) => {
              return {
                product_id: item.product.id,
                quantity: item.quantity,
              };
            }),
          },
        },
      },
    });
    console.log(order);

    return NextResponse.json({ data: order }, { status: 201 });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ err }, { status: 500 });
  }
}
