import Link from "next/link";
import { useStore } from "@/store";

export default function Header() {
  const { reset } = useStore();
  return (
    <header className="h-header border-b flex items-center">
      <Link href="/" onClick={reset}>
        <img className="h-10" src="/svg/logo_light.svg" alt="App Logo" />
      </Link>
    </header>
  );
}
