import { ai } from "@/lib/ai";
import { db } from "@/server/db";
import { journalTopics, journals, topics } from "@/server/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, count, desc, eq, not, sql } from "drizzle-orm";

export async function GET(req: Request) {
  const { userId } = auth();
  const period = new URLSearchParams(req.url).get("period") ?? "week";
  const today = new Date();
  const todayString = today.toDateString();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const weekAgoString = weekAgo.toDateString();
  const monthAgo = new Date();
  monthAgo.setDate(monthAgo.getDate() - 30);
  const monthAgoString = monthAgo.toDateString();

  // Retrieve rank data
  const rankData = await db
    .selectDistinct({ value: topics.value })
    .from(journalTopics)
    .leftJoin(topics, eq(journalTopics.topicId, topics.id))
    .leftJoin(journals, eq(journalTopics.journalId, journals.id))
    .where(eq(journals.userId, userId ?? ""))
    .groupBy(topics.value)
    .having(not(eq(count(topics.value), 0)))
    .orderBy(desc(count(topics.value)));

  // Retrieve mood data
  const moodData = await db
    .select({
      date: journals.date,
      mood: journals.mood,
      rawDate: journals.created_at,
    })
    .from(journals)
    .where(
      and(
        eq(journals.userId, userId ?? ""),
        sql`
          date(substr(date, 8, 4) || '-' ||
          (CASE substr(date, 5, 3)
              WHEN 'Jan' THEN '01'
              WHEN 'Feb' THEN '02'
              WHEN 'Mar' THEN '03'
              WHEN 'Apr' THEN '04'
              WHEN 'May' THEN '05'
              WHEN 'Jun' THEN '06'
              WHEN 'Jul' THEN '07'
              WHEN 'Aug' THEN '08'
              WHEN 'Sep' THEN '09'
              WHEN 'Oct' THEN '10'
              WHEN 'Nov' THEN '11'
              WHEN 'Dec' THEN '12'
           END) || '-' || 
          substr(date, 9, 2)) > ${weekAgo.toISOString().slice(0, 10)}
        `,
        sql`
          date(substr(date, 8, 4) || '-' ||
                (CASE substr(date, 5, 3)
                    WHEN 'Jan' THEN '01'
                    WHEN 'Feb' THEN '02'
                    WHEN 'Mar' THEN '03'
                    WHEN 'Apr' THEN '04'
                    WHEN 'May' THEN '05'
                    WHEN 'Jun' THEN '06'
                    WHEN 'Jul' THEN '07'
                    WHEN 'Aug' THEN '08'
                    WHEN 'Sep' THEN '09'
                    WHEN 'Oct' THEN '10'
                    WHEN 'Nov' THEN '11'
                    WHEN 'Dec' THEN '12'
                END) || '-' || 
                substr(date, 9, 2)) < ${today.toISOString().slice(0, 10)}
        `,
      ),
    );

  const moods = [
    "anxious",
    "worried",
    "uneasy",
    "unsure",
    "calm",
    "happy",
    "serene",
  ];

  try {
    const suggestionCompletion = await ai.chat.completions.create({
      messages: [
        {
          content:
            "You are a model, that is supposed, to analyze the given mood and topics, and based on those create 5 suggestions to improve the mood and remember to have correct grammar, with dot on the end. Respond with just the list of suggestions, the response should be a json of type: {suggestions: ['suggestion1', 'suggestion2', 'suggestion3', 'suggestion4', 'suggestion5']}, like that 'Eat more fresh fruits and vegetables', 'Drink more water.', 'Try to work out at least 30 minutes a day', 'Try to hit 10 000 steps a day.', 'Get around 8-9 hours of good quality sleep.'",
          role: "system",
        },
        {
          content: "suggestion",
          role: "user",
        },
      ],
      model: "gpt-4o",
    });

    const rawData = suggestionCompletion?.choices[0]?.message?.content;
    const json: { suggestions: string[] } = JSON.parse(rawData ?? "null");

    return new Response(rawData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);

    return new Response(null, {
      status: 500,
    });
  }
}
