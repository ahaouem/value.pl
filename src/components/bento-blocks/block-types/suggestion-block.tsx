export default function SuggestionBlock() {
  const suggestions: string[] = [
    "Eat more fresh fruits and vegetables",
    "Drink more water.",
    "Try to work out at least 30 minutes a day",
    "Try to hit 10 000 steps a day.",
    "Get around 8-9 hours of good quality sleep.",
    "Try to meditate for 10 minutes a day.",
    "Try to get some sun every day.",
    "Go out and spend some time in nature.",
  ];
  let randomSuggestion =
    suggestions[Math.floor(Math.random() * suggestions.length)];
  return (
    <>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 14 20"
          className="absolute -right-4 -top-4 size-12 fill-violet-950/25 dark:fill-violet-200/25 lg:-right-9 lg:-top-9 lg:size-24"
        >
          <path
            className="cls-2"
            d="M4.25,16.71c0-.42.34-.76.75-.76h4c.41,0,.75.34.75.76s-.34.76-.75.76h-4c-.41,0-.75-.34-.75-.76ZM4.92,19.24c0-.42.34-.76.75-.76h2.67c.41,0,.75.34.75.76s-.34.76-.75.76h-2.67c-.41,0-.75-.34-.75-.76Z"
          />
          <path
            className="cls-1"
            d="M2.41,11.83l1.1,1.05c.31.3.49.71.49,1.14,0,.65.52,1.17,1.16,1.17h3.69c.64,0,1.16-.52,1.16-1.17,0-.43.18-.84.49-1.14l1.1-1.05c1.54-1.48,2.4-3.42,2.41-5.45v-.08c0-3.45-3.13-6.3-7-6.3S0,2.84,0,6.3v.08c0,2.02.87,3.97,2.41,5.45Z"
          />
        </svg>
        <section>
          <h2 className="text-balance text-left text-base/6 tracking-[-0.015em] text-violet-900 dark:text-violet-200">
            Suggestion for you
          </h2>
          <p className="mt-px text-left text-base font-semibold italic text-violet-950 dark:text-violet-50 md:text-xl lg:text-3xl">
            {randomSuggestion}
          </p>
        </section>
      </div>
    </>
  );
}

/*
export default async function QuoteBlock() {
  const quote = await fetch(
    "https://api.quotable.io/quotes/random?tags=happiness&limit=1",
  )
    .then((res) => res.json())
    .then((data) => data[0].content as string);

  return (
    <>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 84.08 56.13"
          className="absolute lg:-left-4 -top-4 lg:-top-12 size-12 lg:size-24 fill-emerald-400/25"
        >
          <path
            className="stroke-none"
            d="M40.95,20.42C40.95,9.14,31.81,0,20.53,0S1.07,8.83.11,20.06c-1.46,17.15,11.57,31.5,27.38,36.07-5.39-3.26-9.15-8.93-9.78-15.52.92.13,1.86.22,2.81.22,11.28,0,20.42-9.14,20.42-20.42Z"
          />
          <path
            className="stroke-none"
            d="M84.08,20.42c0-11.28-9.14-20.42-20.42-20.42s-19.46,8.83-20.42,20.06c-1.46,17.15,11.57,31.5,27.38,36.07-5.39-3.26-9.15-8.93-9.78-15.52.92.13,1.86.22,2.81.22,11.28,0,20.42-9.14,20.42-20.42Z"
          />
        </svg>
        <h2 className="text-balance text-left text-base/6 tracking-[-0.015em] text-green-900">
          Today&apos;s Quote (kwəʊt)
        </h2>
        <p className="mt-px text-left text-base font-semibold italic text-green-900 md:text-xl lg:text-3xl">
          {quote}
        </p>
      </div>
    </>
  );
}
*/
