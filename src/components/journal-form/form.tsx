"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MoodPicker } from "../mood-picker";
import { Textarea } from "../ui/textarea";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";

const formSchema = z.object({
  mood: z.number(),
  dayDescription: z.string(),
});
export default function JournalForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { mood: 3, dayDescription: "Today I am grateful for " },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast("Todays journal saved");
    const result = generateObject({
      model: openai("gpt-4-turbo"),
      schema: z.object({
        listOfTopics: z.array(z.string()),
        TP: z.array(z.string()),
        TN: z.array(z.string()),
        FP: z.array(z.string()),
        FN: z.array(z.string()),
      }),

      prompt: `Analyze the text below and identify which topics from the specified list are mentioned or discussed. Also check which topics are True Positive, True Negative, False Positive or False Negative. List all topics from the given list that are clearly present in the text, based on direct references or implicit themes. \nHere is the list of topics: \nfamily, friends, school, work, studying, well spent time, hobby, passion, depressed, bad time, tiredness, time away from home, fresh air, nature,\nHere is the text to analyze: \n ${form.getValues().dayDescription}\n Please list the topics from the list that are present in the text. Just list of topics, without description, list of the TP TN FP FN topics also`,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-3.5 flex flex-col justify-center space-y-6 p-2 sm:p-8"
      >
        <Card>
          <FormField
            name="mood"
            render={({ field }) => (
              <FormItem>
                <CardHeader>
                  <FormLabel className="text-2xl">How do you feel?</FormLabel>
                </CardHeader>
                <CardContent>
                  <FormControl>
                    <MoodPicker
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                </CardContent>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        <Card>
          <FormField
            name="dayDescription"
            render={({ field }) => (
              <FormItem>
                <CardHeader>
                  <FormLabel className="text-2xl">How was your day?</FormLabel>
                </CardHeader>
                <CardContent>
                  <FormControl>
                    <div className="flex h-full w-full">
                      <Textarea
                        {...field}
                        placeholder="Today I am grateful for..."
                        onKeyDown={(e) => {
                          if (
                            e.key === "Tab" &&
                            form.getValues().dayDescription.trim() === ""
                          ) {
                            e.preventDefault();
                            form.setValue(
                              "dayDescription",
                              "Today I am grateful for ",
                            );
                          }
                        }}
                        className="h-48 w-full resize-none sm:h-64 md:h-80 lg:h-96"
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is where you can write about your day, what you are
                    grateful for, describe your feelings, or whatever you have
                    laying on your heart.
                  </FormDescription>
                </CardContent>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
