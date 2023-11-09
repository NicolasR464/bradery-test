import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Image from "next/image";

import AddToCartBtn from "@/components/AddToCartBtn";

import { BrandData } from "../../interfaces";

async function getBrandData(brandName: string) {
  try {
    const res = await prisma.brands.findFirst({
      where: { name: brandName },

      include: {
        Products: {
          select: {
            name: true,
            price: true,
            img_url: true,
            stripe_id: true,
            inventory: true,
          },
        },
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
        <div>
          {data.Products.map((product, index) => {
            return (
              <div data-stripe={product.stripe_id} key={index}>
                <div className="relative">
                  <AddToCartBtn productData={product} />
                  <Image
                    width={200}
                    height={200}
                    src={product.img_url!}
                    alt={`${product.name} banner image`}
                  />
                </div>
                <span>{product.name}</span>
                <span>{+product.price + "€"}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
