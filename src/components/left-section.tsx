import DaysList from "./days-tabs/days-list";

export default function LeftSection() {
  return (
    <div className="flex-1 bg-zinc-100 p-2 md:p-4">
      <div className="w-full">
        <DaysList />
      </div>
    </div>
  );
}
