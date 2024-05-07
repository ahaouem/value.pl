import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="grid h-screen place-content-center bg-zinc-100 pb-32">
      <SignIn path="/sign-in" />
    </main>
  );
}
