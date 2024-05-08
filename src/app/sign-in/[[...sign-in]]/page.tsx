import { SignIn } from "@clerk/nextjs";
import BlurredView from "@/assets/BluredLoggedInView.png";
import Image from "next/image";

export default function Page() {
  return (
    <main className="grid h-screen place-content-center bg-zinc-100 pb-32">
      <Image src={BlurredView} alt="Blurred View" className="absolute z-0" />
      <SignIn />
    </main>
  );
}
