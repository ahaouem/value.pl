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
    defaultValues: { mood: 3, dayDescription: "Today I am grateful for..." },
  });
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  const [rows, setRows] = useState<number>(5);

  useEffect(() => {
    function updateRows() {
      const viewportWidth: number = window.innerWidth;
      let newRows: number = 5;

      if (viewportWidth <= 768) {
        newRows = 3;
      } else if (viewportWidth <= 1024) {
        newRows = 4;
      }

      setRows(newRows);
    }

    updateRows();
    window.addEventListener("resize", updateRows);

    return () => {
      window.removeEventListener("resize", updateRows);
    };
  }, []);

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
                    <Textarea
                      {...field}
                      placeholder="Write about your day, what you are grateful for, or anything else you want to remember."
                      rows={rows}
                    />
                  </FormControl>
                  <FormDescription>
                    This is where you can write about your day, what you are
                    grateful for, or anything else you want to remember.
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
