import { ai } from "@/lib/ai";
import { db } from "@/server/db";
import { formSchema } from "@/schemas";
import { z } from "zod";
import { journals, journalTopics, streaks, topics } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId } = auth();

  const { mood, dayDescription, date } = (await req.json()) as z.infer<
    typeof formSchema
  > & { date: string };

  try {
    const chatCompletion = await ai.chat.completions.create({
      messages: [
        {
          content:
            "You are a model that analyzes the given text and identifies which topics from the specified list are mentioned or discussed. Also check which topics are True Positive (It's good that they are happening), True Negative (It's bad that they are happening), False Positive (It's good that they are not happening) or False Negative (It's bad that they are not happening). List all topics from the given list that are clearly present in the text, based on direct references or implicit themes. \nHere is the list of topics: \nfamily, friends, school, work, studying, well spent time, hobby, passion, depressed, bad time, tiredness, time away from home, fresh air, nature. Respond with just the list of topics, without description, including the list of the TP TN FP FN topics, the response should be a json of type: {topics: ['topic1', 'topic2', ...], TP: ['topic1', 'topic2', ...], TN: ['topic1', 'topic2', ...], FP: ['topic1', 'topic2', ...], FN: ['topic1', 'topic2', ...]}",
          role: "system",
        },
        {
          content: dayDescription,
          role: "user",
        },
      ],

      model: "gpt-4-turbo",
    });

    const json: {
      topics: string[];
      TP: string[];
      TN: string[];
      FP: string[];
      FN: string[];
    } = JSON.parse(chatCompletion?.choices[0]?.message?.content ?? "null");

    const addedJournal = await db
      .insert(journals)
      .values({
        userId: userId!,
        date,
        mood: mood,
        notes: dayDescription,
      })
      .returning();

    console.log(addedJournal);

    const topics = await db.query.topics.findMany();

    const test = json.topics.map((t) => ({
      topicId: topics.find((topic) => topic.value === t)?.id || "",
      journalId: addedJournal?.[0]?.id || "",
    }));
    console.log(test);

    await db.insert(journalTopics).values(
      json.topics
        .map((t) => ({
          topicId: topics.find((topic) => topic.value === t)?.id || "",
          journalId: addedJournal?.[0]?.id || "",
        }))
        .filter((t) => t.topicId !== ""),
    );

    const streak = await db.query.streaks.findFirst({
      where: (model, { eq }) => eq(model.userId, userId ?? ""),
    });
    if (streak) {
      await db
        .update(streaks)
        .set({
          value: streak.value + 1,
        })
        .where(eq(streaks.userId, userId ?? ""));
    } else {
      await db.insert(streaks).values({
        userId: userId ?? "",
        value: 1,
      });
    }

    return new Response(JSON.stringify({ ok: true }));
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ ok: false }));
  }
}
