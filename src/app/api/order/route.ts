import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const items: any = await req.json();

  try {
    await prisma.orders.create({
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

    const inventoryUpdate = await items.map((item: any) => {
      console.log("💥");
      console.log(item);

      const product = prisma.products
        .findUnique({
          where: {
            id: item.product.id,
          },
          select: {
            inventory: true,
          },
        })
        .then((res) => {
          if (item.quantity > res?.inventory!) {
            return NextResponse.json(
              { response: "Not enough items in inventory left" },
              { status: 500 }
            );
          } else {
            return res;
          }
        })
        .then((res) => {
          console.log("in RES 2 🚀");

          console.log(res);

          prisma.products
            .update({
              where: {
                id: item.product.id,
              },
              data: {
                inventory: {
                  decrement: item.quantity,
                },
              },
            })
            .then((updateRes) => console.log({ updateRes }));
        })
        .catch((err) => NextResponse.json({ err }, { status: 500 }));
    });

    return NextResponse.json({ data: "order placed" }, { status: 201 });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ err }, { status: 500 });
  }
}
