import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore/lite";
import { signupSchema } from "./zodSchema/signup";
import { z } from "zod";
import { addPillSchema } from "./zodSchema/addPills";


export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  phoneNumber: string | null;
  photoURL: string | null;
}



export type signupData = z.infer<typeof signupSchema>;
export type Pill = z.infer<typeof addPillSchema>;


export type PillDataFilter = "all" | "supplement" | "drug"

export type PillDataSort = "AtoZ" | "pillsLeftAscending" | "pillsLeftDescending" | "expiryDate"

