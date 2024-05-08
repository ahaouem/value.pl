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
import { useSession, useUser, UserButton, SignInButton } from "@clerk/nextjs";

const formSchema = z.object({
  mood: z.number(),
  dayDescription: z.string(),
  userId: z.string(),
});

export default function JournalForm() {
  const { user } = useUser();
  const { session } = useSession();

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
    const response = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(response);
    toast("Todays journal saved");
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
