import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore/lite";
import { signupSchema } from "./zodSchema/signup";
import { z } from "zod";
import { addPillSchema } from "./zodSchema/addPills";
import { loginSchema } from "./zodSchema/login";


export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  // lastLoginAt: Timestamp;
}

export interface decodedUser {
  uid: string;
  email?: string;
  displayName: string;
  photoURL?: string;
  lastLoginAt: Timestamp;
}



export type signupData = z.infer<typeof signupSchema>;
export type Pill = z.infer<typeof addPillSchema>;
export type loginData = z.infer<typeof loginSchema>


export type PillDataFilter = "all" | "supplement" | "drug"

export type PillDataSort = "AtoZ" | "pillsLeftAscending" | "pillsLeftDescending" | "expiryDate"

export type TabType = {
  id: number;
}

type Supplement = {
  supplementName : string;
  imageURL : string;
}

export interface Concern {
  id: number;
  title: string;
  supplementsList: Supplement[];
  contents : string[];
}