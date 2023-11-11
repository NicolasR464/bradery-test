import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  const prodId = params.id;
  console.log({ prodId });

  try {
    const inventoryNumb = await prisma.products.findFirst({
      where: {
        id: prodId,
      },
      select: {
        inventory: true,
      },
    });

    console.log({ inventoryNumb });

    return NextResponse.json(inventoryNumb, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { response: "Something went wrong" },
      { status: 500 }
    );
  }
}
