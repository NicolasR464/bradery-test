import Link from "next/link";

export default function Success() {
  return (
    <div>
      <h1>Achat réussi </h1>
      <Link className="underline" href="/">
        revenez sur la page d&apos;accueil
      </Link>
    </div>
  );
}
