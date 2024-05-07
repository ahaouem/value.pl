import LeftSection from "@/components/left-section";
import RightSection from "@/components/right-section";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    redirect("/sign-up");
  }
  return (
    <main className="grid min-h-screen text-zinc-950 lg:grid-cols-2">
      <LeftSection />

      <Drawer>
        <DrawerTrigger className="fixed inset-x-0 bottom-0 h-8 bg-white lg:hidden">
          <div className="bg-muted mx-auto h-2 w-[100px] rounded-full" />
        </DrawerTrigger>
        <DrawerContent>
          <RightSection mobile />
        </DrawerContent>
      </Drawer>

      <RightSection />
    </main>
  );
}
