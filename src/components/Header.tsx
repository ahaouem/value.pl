import { UserButton, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default function Header() {
  const { userId }: { userId: string | null } = auth();
  return (
    <header className="flex items-center justify-between bg-zinc-200 p-4 text-zinc-50 shadow">
      {userId ? (
        <>
          <h1 className="text-xl">Welcome back!</h1>
          <UserButton />
        </>
      ) : (
        <>
          <h1 className="text-xl">Welcome!</h1>
          <SignInButton />
        </>
      )}
    </header>
  );
}
