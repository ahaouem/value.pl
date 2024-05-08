import { SignUp } from "@clerk/nextjs";
import SignedInView from "@/assets/LoggedInView.png";
import Image from "next/image";
export default function Page() {
  return (
    <main className="grid h-screen place-content-center bg-zinc-100 pb-32">
      <Image
        src={SignedInView}
        alt="Blurred View"
        className="pointer-events-none absolute inset-0 z-0 blur-md"
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/50"></div>
      <SignUp />
    </main>
  );
}
