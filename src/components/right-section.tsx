import BlocksLayout from "./bento-blocks/blocks-layout";
import HelloHeader from "./ui/header";
import { HeroHighlight } from "./ui/hero-highlight";

export default function RightSection() {
  return (
    <main className="h-screen flex-1 p-4 md:p-12">
      <HeroHighlight>
        <HelloHeader />
        <BlocksLayout />
      </HeroHighlight>
    </main>
  );
}
