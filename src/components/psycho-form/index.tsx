"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function PsychoForm({
  questions,
  scale,
}: {
  questions: string[];
  scale: string[];
}) {
  const formSchema = z
    .array(
      z.object({
        question: z.string().min(1),
        answer: z.number(),
      }),
    )
    .length(questions.length);
  const [questionID, setQuestionID] = useState(0);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: questions.map((question) => ({ question, answer: 0 })),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-3.5 flex flex-col justify-center space-y-6 p-2 sm:p-8"
      >
        {questions.map((question, index) => (
          <div hidden={index !== questionID}>
            <FormField
              name={question}
              render={({ field }) => (
                <FormItem className="flex flex-col gap-4">
                  <div className="flex flex-row justify-between">
                    <Button
                      className="select-none"
                      variant="secondary"
                      onClick={() => setQuestionID(questionID - 1)}
                      disabled={index == 0}
                    >
                      Prev
                    </Button>
                    <FormLabel className="text-center text-xl">
                      {question}
                    </FormLabel>
                    <Button
                      className="select-none"
                      variant="secondary"
                      onClick={() => setQuestionID(questionID + 1)}
                      disabled={index === questions.length - 1 || !field.value}
                    >
                      Next
                    </Button>
                  </div>
                  <RadioGroup
                    className="flex flex-col justify-evenly gap-1"
                    onValueChange={field.onChange}
                  >
                    {scale.map((option, i) => (
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormItem>
              )}
            />
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
