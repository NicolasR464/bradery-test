import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Image from "next/image";

import AddToCartBtn from "@/components/AddToCartBtn";
import ShopVignette from "@/components/ShopVignette";

import { BrandData } from "../../../utils/interfaces";

async function getBrandData(brandName: string) {
  try {
    const res = await prisma.brands.findFirst({
      where: { name: brandName },

      include: {
        Products: true,
      },
    });

    return res;
  } catch (err) {
    console.error(err);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

export default async function BrandPage({
  params,
}: {
  params: { brand: string };
}) {
  const data: BrandData | null | undefined = await getBrandData(params.brand);
  console.log(data);

  return (
    <div>
      {/* Brand banner */}
      {data && (
        <div>
          <Image
            width={200}
            height={200}
            src={data.main_img_url!}
            alt={`${data.name} banner image`}
          />
        </div>
      )}

      {/* Products body */}
      {data && (
        <section className="flex justify-around m-8">
          {data.Products.map((product, index) => {
            return <ShopVignette key={index} productData={product} />;
          })}
        </section>
      )}
    </div>
  );
}
