import Journal from "@/components/journal";
import JournalForm from "@/components/journal-form/form";
import { db } from "@/server/db";
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
  searchParams: { date?: string | null };
}) {
  if (!date) return null;
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
      <JournalForm date={date} />
    </>
  );
}
