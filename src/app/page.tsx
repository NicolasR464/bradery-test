import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>brad</h1>
      <Button>Click me</Button>
      <Link href="/collection/maroodjy">Maroodjy</Link>
    </main>
  );
}
