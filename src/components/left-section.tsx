import { db } from "@/server/db";
import DaysList from "./days-tabs/days-list";
import { auth } from "@clerk/nextjs/server";

export default async function LeftSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  const journals = await db.query.journals.findMany({
    where: (model, { eq }) => eq(model.userId, userId ?? ""),
  });
  return (
    <div className="w-full bg-zinc-100 p-2 md:p-4 lg:h-screen">
      <DaysList firstDate={new Date("2021-09-01")} />
      {children}
    </div>
  );
}
