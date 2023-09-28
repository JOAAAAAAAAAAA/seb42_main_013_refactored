import { Timestamp } from "firebase/firestore/lite";
import { signupSchema } from "./zodSchema/signup";
import { z } from "zod";
import { addPillSchema } from "./zodSchema/addPills";
import { loginSchema } from "./zodSchema/login";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  concerns: string[] | null;
}

export interface AuthUser extends User{
  lastLoginAt: Timestamp;
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

export type Supplement = {
  supplementName : string;
  imageURL : string;
}

export type HealthSvgSpriteID =
  | "all"
  | "anti_oxidant"
  | "blood_glucose_control"
  | "blood_improvement"
  | "blood_pressure_control"
  | "body_fat_reduction"
  | "bone_health"
  | "capsule"
  | "chewable"
  | "cholesterol"
  | "climacteric"
  | "eye_health"
  | "family"
  | "fatigue_recovery"
  | "female"
  | "growth_and_development"
  | "gummy"
  | "immunity"
  | "improve_memory"
  | "improve_sleep_quality"
  | "infant_youth"
  | "intestinal_health"
  | "liquid"
  | "liver_health"
  | "male"
  | "male_and_female"
  | "nutritional_supplement"
  | "powder"
  | "pregnant_woman"
  | "prostate"
  | "relaxation_of_tension"
  | "senior"
  | "skin_health"
  | "stomach_health"
  | "tablet"

export interface Concern {
  id: HealthSvgSpriteID;
  title: string;
  supplementsList: Supplement[];
  contents : string[];
}

export interface ConcernWithBase64 extends Concern{
  supplementsList: {
    supplementName: string;
    imageURL: string;
    base64: string;
  }[]
}

