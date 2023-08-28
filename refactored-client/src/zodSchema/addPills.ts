import { z } from "zod";

export const addPillSchema = z.object({
  supplementName: z.string().min(1).max(100),
  nutrients: z.array(z.string().min(1).max(100)),
  imageURL: z.string().min(1).max(100),
  supplementType: z.string().min(1).max(100),
  concernId: z.number(),
  expirationDate: z.date(),
  startDate: z.date(),
  endDate: z.date(),
  takingTime: z.array(z.string().min(1).max(100)),
  pillsLeft: z.number(),
  totalCapacity: z.number(),
  dosagePerServing: z.number(),
  dosageInterval: z.number(),
});

export type Pill = z.infer<typeof addPillSchema>;