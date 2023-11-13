import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { CartItem } from "@/utils/interfaces";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const productId = params.id;
  const { searchParams } = new URL(req.url);
  const cartId = searchParams.get("cart-id");
  try {
    const cartItem = await prisma.cartItems.findFirst({
      where: {
        cart_id: +cartId!,
        product_id: +productId,
      },
    });

    const delRes = await prisma.cartItems.delete({
      where: {
        id: cartItem?.id,
      },
    });

    return NextResponse.json({ response: delRes }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { response: "something went wront" },
      { status: 500 }
    );
  }
}
