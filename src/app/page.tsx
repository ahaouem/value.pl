import Journal from "@/components/journal";
import JournalForm from "@/components/journal-form/form";
import LeftSection from "@/components/left-section";
import { db } from "@/server/db";
import { journalTopics } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";

type Journal = {
  date: string;
  id: string;
  created_at: string;
  updated_at: string;
  userId: string;
  mood: number;
  notes: string;
  TP: string | null;
  TN: string | null;
  FP: string | null;
  FN: string | null;
};
export default async function HomePage({
  searchParams: { date },
}: {
  searchParams: { date: string };
}) {
  const { userId } = auth();
  const journal = await db.query.journals.findFirst({
    where: (model, { eq, and }) =>
      and(eq(model.date, date), eq(model.userId, userId ?? "")),
  });
  const c = await db.query.journalTopics.findMany({
    where: (model, { eq }) => eq(model.journalId, journal?.id ?? ""),
  });
  console.log(c);

  return journal ? (
    <Journal dayDesc={journal.notes} mood={journal.mood} tags={[]} />
  ) : (
    <>
      <JournalForm />
    </>
  );

  // {calendar[currentWeekIndex]?.map((day, dayIndex) => (
  //   <TabsContent key={dayIndex} value={day.date}>
  //     {journals.find((journal) => journal.date === day.date) ? (
  //       <Journal
  //         dayDesc={
  //           journals.find((journal) => journal.date === day.date)
  //             ?.notes ?? ""
  //         }
  //         mood={
  //           journals.find((journal) => journal.date === day.date)?.mood ??
  //           0
  //         }
  //         tags={[]}
  //       />
  //     ) : (
  //       <JournalForm />
  //     )}
  //   </TabsContent>
  // ))}
}
