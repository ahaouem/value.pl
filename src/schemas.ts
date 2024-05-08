import { z } from "zod";

export const formSchema = z.object({
  mood: z.number(),
  dayDescription: z.string(),
});
