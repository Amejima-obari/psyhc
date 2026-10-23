
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-black">
          Trial 1
        </Link>

        <nav className="flex items-center gap-6 text-sm text-gray-600">
          <Link href="#products" className="hover:text-black">
            Products
          </Link>
          <Link href="#contact" className="hover:text-black">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
