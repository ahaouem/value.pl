export default function StreakBlock() {
  return (
    <div className="mx-auto max-w-md rounded-lg  p-8 shadow-md dark:bg-gray-900">
      <div className="mb-6 flex flex-col items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Current Streak
        </h2>
        <div className="mt-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-2xl font-bold text-white dark:bg-green-600">
          14
        </div>
      </div>
    </div>
  );
}
