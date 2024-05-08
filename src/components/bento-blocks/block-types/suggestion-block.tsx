export default function SuggestionBlock() {
  const suggestions: string[] = [
    "Eat more fresh fruits and vegetables",
    "Drink more water.",
    "Try to work out at least 30 minutes a day",
    "Try to hit 10 000 steps a day.",
    "Get around 8-9 hours of good quality sleep.",
    "Try to meditate for 10 minutes a day.",
    "Try to get some sun every day.",
    "Go out and spend in nature.",
  ];
  let randomSuggestion =
    suggestions[Math.floor(Math.random() * suggestions.length)];
  return (
    <>
      <div>
        <h2 className="text-balance text-left text-base font-semibold tracking-[-0.015em] text-violet-950 md:text-xl lg:text-3xl">
          {randomSuggestion}
        </h2>
      </div>
    </>
  );
}
