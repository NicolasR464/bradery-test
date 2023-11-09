import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function getRelatedProducts(brandName: string) {
  try {
    const res = await prisma.products.findMany({
      where: {
        Brands: {
          name: brandName,
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

export default async function Brand({ params }: { params: { brand: string } }) {
  console.log(params);
  console.log(params.brand);

  const productsData = await getRelatedProducts(params.brand);
  console.log(productsData);

  return (
    <div>
      <h1>Maroodjy</h1>
    </div>
  );
}
