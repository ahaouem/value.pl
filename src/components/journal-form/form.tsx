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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MoodPicker } from "../mood-picker/mood-picker";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  mood: z.number(),
  dayDescription: z.string(),
});
export default function JournalForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { mood: 4, dayDescription: "Today I am grateful for " },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const [rows, setRows] = useState<number>(20);
  var newRows: number = rows;
  const viewportHeight = window.innerHeight;
  console.log(viewportHeight);
  useEffect(() => {
    function updateRows() {
      const viewportHeight = window.innerHeight;
      if (viewportHeight < 600) {
        newRows = 4;
      } else if (viewportHeight < 800) {
        newRows = 8;
      } else if (viewportHeight >= 1000) {
        newRows = 20;
      } else if (viewportHeight >= 1200) {
        newRows = 24;
      } else {
        newRows = 28;
      }
      setRows(newRows);
    }

    updateRows();
    window.addEventListener("resize", updateRows);
    return () => {
      window.removeEventListener("resize", updateRows);
    };
  }, []);

  console.log(rows);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-center space-y-8 p-8"
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
                        rows={rows}
                        className="h-full w-full resize-none"
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
