import { cn } from "@/lib/utils";
import BlocksLayout from "./bento-blocks/blocks-layout";
import HelloHeader from "./ui/header";
import { HeroHighlight } from "./ui/hero-highlight";

export default function RightSection({ mobile }: { mobile?: boolean }) {
  return (
    <main className={cn("h-screen p-4 md:p-12", !mobile && "max-lg:hidden")}>
      <HeroHighlight>
        <HelloHeader />
        <BlocksLayout />
      </HeroHighlight>
    </main>
  );
}
