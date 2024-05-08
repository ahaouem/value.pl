import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
  return (
    <html lang="en">
      <ClerkProvider>
        <body className="font-sans">{children}</body>
        <Toaster />
      </ClerkProvider>
    </html>
  );
}
