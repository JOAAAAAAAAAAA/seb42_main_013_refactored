import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  displayName: z.string().min(1).max(100),
  password: z.string().min(6).max(100),
});

export type signupData = z.infer<typeof signupSchema>;



