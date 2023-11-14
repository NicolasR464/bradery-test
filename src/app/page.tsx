import { Button } from "@nextui-org/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <article className="flex justify-around	">
        <Link href="/collection/maroodjy">
          <Image
            width={200}
            height={200}
            src="https://res.cloudinary.com/niikkoo/image/upload/v1699481739/bradery-test/brands/pexels-ali-pazani-12513869_qv4rv8.jpg"
            alt="brand image"
          />
        </Link>
        <Link href="/collection/heifeoi">
          <Image
            width={200}
            height={200}
            src="https://res.cloudinary.com/niikkoo/image/upload/v1699481755/bradery-test/brands/pexels-the-lazy-artist-gallery-1300550_m4axmq.jpg"
            alt="brand image"
          />
        </Link>
        <Link href="/collection/vista">
          <Image
            width={200}
            height={200}
            src="https://res.cloudinary.com/niikkoo/image/upload/v1699481753/bradery-test/brands/pexels-joshua-abner-3605015_smvsro.jpg"
            alt="brand image"
          />
        </Link>
      </article>
    </main>
  );
}
