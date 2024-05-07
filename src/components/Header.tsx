import { Logo } from "@/assets";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-zinc-200 p-4 text-zinc-50 shadow">
      <Logo />
      <h1 className="text-2xl font-bold"></h1>
    </header>
  );
}
