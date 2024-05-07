import LeftSection from "@/components/left-section";
import RightSection from "@/components/right-section";

export default async function HomePage() {
  return (
    <main className="grid min-h-screen text-zinc-950 lg:grid-cols-2">
      <LeftSection />
      <RightSection />
    </main>
  );
}
