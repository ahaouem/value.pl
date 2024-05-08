import OpenAI from "openai";
import { db } from "@/server/db";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
import { formSchema } from "@/schemas";
import { z } from "zod";
import { journal, journal_tag, topics } from "@/server/db/schema";

export async function POST(req: Request) {
  const { mood, dayDescription, userId } = (await req.json()) as z.infer<
    typeof formSchema
  >;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          content:
            "You are a model that analyzes the given text and identifies which topics from the specified list are mentioned or discussed. Also check which topics are True Positive (It's good that they are happening), True Negative (It's bad that they are happening), False Positive (It's good that they are not happening) or False Negative (It's bad that they are not happening). List all topics from the given list that are clearly present in the text, based on direct references or implicit themes. \nHere is the list of topics: \nfamily, friends, school, work, studying, well spent time, hobby, passion, depressed, bad time, tiredness, time away from home, fresh air, nature. Respond with just the list of topics, without description, including the list of the TP TN FP FN topics, the response should be a json of type: {topics: ['topic1', 'topic2', ...], TP: ['topic1', 'topic2', ...], TN: ['topic1', 'topic2', ...], FP: ['topic1', 'topic2', ...], FN: ['topic1', 'topic2', ...]}",
          //
          role: "system",
        },
        {
          content: dayDescription,
          role: "user",
        },
      ],

      model: "gpt-4-turbo",
    });

    console.log(chatCompletion.choices[0]);
    const json: {
      topics: string[];
      TP: string[];
      TN: string[];
      FP: string[];
      FN: string[];
    } = JSON.parse(chatCompletion?.choices[0]?.message?.content ?? "null");

    const json: {
      topics: string[];
      TP: string[];
      FP: string[];
      TN: string[];
      FN: string[];
    } = JSON.parse(chatCompletion.choices[0]?.message.content || "");

    db.insert(journal)
      .values({
        userId,
        date: new Date().toDateString(),
        mood: mood,
        notes: dayDescription,
      })
      .returning(journal.id);
    return new Response(JSON.stringify({ ok: true }));
  } catch (e) {
    return new Response(JSON.stringify({ ok: false }));
  }
}
