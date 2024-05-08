import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import RightSection from "@/components/right-section";
import LeftSection from "@/components/left-section";
import { ScrollArea } from "@/components/ui/scroll-area";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export const metadata = {
  title: "ur Value",
  description: "Journal with us!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId }: { userId: string | null } = auth();
  if (!userId) {
    redirect("/sign-up");
  }
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="font-sans">
          <main className="grid min-h-screen lg:grid-cols-2">
            <LeftSection>{children}</LeftSection>
            <Drawer>
              <DrawerTrigger className="fixed inset-x-0 bottom-0 h-8 bg-background lg:hidden">
                <div className="mx-auto h-2 w-[100px] rounded-full bg-muted" />
              </DrawerTrigger>
              <DrawerContent className="h-[calc(100vh-1rem)]">
                <ScrollArea>
                  <RightSection mobile />
                </ScrollArea>
              </DrawerContent>
            </Drawer>

            <RightSection />
          </main>
        </body>
        <Toaster />
      </ClerkProvider>
    </html>
  );
}
