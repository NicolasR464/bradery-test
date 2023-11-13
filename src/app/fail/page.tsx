import Link from "next/link";

export default function Fail() {
  return (
    <div>
      <h1>Votre achat a échoué</h1>
      <Link className="underline" href="/">
        revenez sur la page d&apos;accueil
      </Link>
    </div>
  );
}
