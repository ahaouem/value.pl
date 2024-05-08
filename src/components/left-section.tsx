import DaysList from "./days-tabs/days-list";

export default async function LeftSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full p-2 md:p-4 lg:h-screen">
      <DaysList firstDate={new Date("2024-05-01")} />
      {children}
    </div>
  );
}
