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
