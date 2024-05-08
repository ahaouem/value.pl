export default function StreakBlock() {
  return (
    <div className="mx-auto max-w-md rounded-lg text-amber-950">
      <div className="flex items-center justify-between lg:mb-6 lg:flex-col">
        <h2 className="text-xl font-bold lg:text-2xl">Current Streak</h2>
        <div className="relative flex size-16 items-center justify-center lg:mt-4 lg:size-24">
          <svg
            className="absolute inset-0 -z-10 fill-amber-500/40"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M159.3 5.39999C167.1 -1.90001 179.2 -1.80001 187 5.49999C214.6 31.4 240.5 59.3 264.7 89.5C275.7 75.1 288.2 59.4 301.7 46.6C309.6 39.2 321.8 39.2 329.7 46.7C364.3 79.7 393.6 123.3 414.2 164.7C434.5 205.5 448 247.2 448 276.6C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5C0 238.1 17.8 191.2 45.4 144.8C73.3 97.7 112.7 48.6 159.3 5.39999Z" />
          </svg>
          <div className="absolute inset-y-10 flex items-center justify-center text-center text-3xl font-bold lg:inset-y-16">
            15
          </div>
        </div>
      </div>
    </div>
  );
}
