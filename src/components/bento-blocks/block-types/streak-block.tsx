export default function StreakBlock() {
  return (
    <div className="mx-auto max-w-md rounded-lg dark:bg-gray-900">
      <div className="mb-6 flex flex-col items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-950 dark:text-gray-100">
          Current Streak
        </h2>
        <div className="relative mt-4 flex h-24 w-24 items-center justify-center">
          <svg
            className="absolute inset-0 -z-10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="#FFD43B"
              d="M159.3 5.4c7.8-7.3 19.9-7.2 27.7 .1c27.6 25.9 53.5 53.8 77.7 84c11-14.4 23.5-30.1 37-42.9c7.9-7.4 20.1-7.4 28 .1c34.6 33 63.9 76.6 84.5 118c20.3 40.8 33.8 82.5 33.8 111.9C448 404.2 348.2 512 224 512C98.4 512 0 404.1 0 276.5c0-38.4 17.8-85.3 45.4-131.7C73.3 97.7 112.7 48.6 159.3 5.4zM225.7 416c25.3 0 47.7-7 68.8-21c42.1-29.4 53.4-88.2 28.1-134.4c-4.5-9-16-9.6-22.5-2l-25.2 29.3c-6.6 7.6-18.5 7.4-24.7-.5c-16.5-21-46-58.5-62.8-79.8c-6.3-8-18.3-8.1-24.7-.1c-33.8 42.5-50.8 69.3-50.8 99.4C112 375.4 162.6 416 225.7 416z"
            />
          </svg>
          <div className="absolute inset-y-16 flex items-center justify-center text-center text-3xl font-bold">
            14
          </div>
        </div>
      </div>
    </div>
  );
}
