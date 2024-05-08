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
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession, useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { MoodPicker } from "../mood-picker";
import { Textarea } from "../ui/textarea";

const formSchema = z.object({
  mood: z.number(),
  dayDescription: z.string(),
  userId: z.string(),
});

export default function JournalForm({ date }: { date: string }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const { session } = useSession();
  const router = useRouter();

  if (!user || !session) return null;
  const userId = user.id;

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mood: 3,
      dayDescription: "Today I am grateful for...",
      userId,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    data = { ...data, userId };
    setLoading(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ ...data, date }),
    });
    if (response.ok) {
      toast.success("Journal entry saved successfully");
      router.refresh();
    } else {
      toast.error("Failed to save journal entry");
    }
    setLoading(false);
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
        <Button
          type="submit"
          disabled={loading}
          className={cn(
            "relative",
            loading
              ? "text-transparent [&_svg]:stroke-primary-foreground"
              : "text-primary-foreground [&_svg]:stroke-transparent",
          )}
        >
          Save
          <div className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-content-center">
            <Loader2 className="animate-spin" />
          </div>
        </Button>
      </form>
    </Form>
  );
}
