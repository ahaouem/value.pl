export default function StreakBlock() {
  return (
    <div className="mx-auto max-w-md rounded-lg dark:bg-gray-900">
      <div className="mb-6 flex flex-col items-center justify-between">
        <h2 className="text-2xl font-bold text-amber-950 dark:text-gray-100">
          Current Streak
        </h2>
        <div className="fire-gradient mt-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-full text-3xl font-bold text-white">
          14
        </div>
      </div>
    </div>
  );
}
