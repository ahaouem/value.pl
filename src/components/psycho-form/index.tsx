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
  scale,
  values,
  onChange,
  className,
  ...props
}: {
  scale: string[];
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
} & React.HTMLAttributes<HTMLDivElement>) {
  const [questionID, setQuestionID] = useState(0);

  return (
    <>
      {Object.entries(values).map(([question, value], index) => (
        <div hidden={index !== questionID}>
          <div className="flex flex-row items-center justify-between">
            <Button
              type="button"
              className="select-none"
              variant="secondary"
              onClick={() => setQuestionID(questionID - 1)}
              disabled={index == 0}
            >
              Prev
            </Button>
            <h3 className="m-2 text-center text-xl">{question}</h3>
            <Button
              type="button"
              className="select-none"
              variant="secondary"
              onClick={() => setQuestionID(questionID + 1)}
              disabled={index == Object.keys(values).length - 1}
            >
              Next
            </Button>
          </div>
          <RadioGroup
            className="mt-2 flex flex-col-reverse justify-evenly gap-1"
            value={value}
            onValueChange={(v) => {
              onChange({
                ...values,
                [question]: v,
              });
            }}
          >
            {scale.map((option, i) => (
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={i.toString()} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </>
  );
}
