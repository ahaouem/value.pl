import LeftSection from "@/components/left-section";
import RightSection from "@/components/right-section";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

export default async function HomePage() {
  return (
    <main className="grid min-h-screen text-zinc-950 lg:grid-cols-2">
      <LeftSection />

      <Drawer>
        <DrawerTrigger className="h-8 lg:hidden">
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
