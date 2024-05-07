import Image from "next/image";

export default function SuggestionBlock() {
  return (
    <>
      <div>
        <h2 className="text-balance text-left text-base font-semibold tracking-[-0.015em] text-white md:text-xl lg:text-3xl">
          Today&apos;s Quote (kwəʊt)
        </h2>
        <p className="mt-4 text-left  text-base/6 italic text-neutral-200">
          If my life was Fortnite, I&apos;d be on the default skin level.
        </p>
      </div>
      <Image
        src="/linear.webp"
        width={500}
        height={500}
        alt="linear demo image"
        className="absolute -bottom-10 -right-4 rounded-2xl object-contain grayscale filter lg:-right-[40%]"
      />
    </>
  );
}
