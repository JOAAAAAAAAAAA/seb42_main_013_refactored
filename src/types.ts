import { Timestamp } from 'firebase/firestore/lite'
import { z, ZodIssueCode } from 'zod'
import { addPillSchema } from './zodSchema/addPills'
import { loginSchema } from './zodSchema/login'
import { signupSchema } from './zodSchema/signup'

export interface User {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  concerns: string[] | null
}

export interface FlattenedError {
  message: string
  errorCode: ZodIssueCode
}

export interface FormState extends Pill {
  errorMessage: {
    [path in keyof Pill]?: FlattenedError[]
  }
}

export interface AuthUser extends User {
  lastLoginAt: Timestamp
}

export interface decodedUser {
  uid: string
  email?: string
  displayName: string
  photoURL?: string
  lastLoginAt: Timestamp
}

export type SignUpData = z.infer<typeof signupSchema>
export type Pill = z.infer<typeof addPillSchema>
export type LoginData = z.infer<typeof loginSchema>

export interface PillData extends Pill {
  id: string
  createdAt: Date
}

export type PillDataFilter = 'all' | 'supplement' | 'drug'

export type PillDataSort =
  | 'recent'
  | 'AtoZ'
  | 'ZtoA'
  | 'pillsLeftAscending'
  | 'pillsLeftDescending'

export type TabType = {
  id: number
}

export type Supplement = {
  supplementName: string
  imageURL: string
}

export type HealthSvgSpriteID =
  | "all"
  | "anti_oxidant"
  | "blood_glucose_control"
  | "blood_improvement"
  | "blood_pressure_control"
  | "body_fat_reduction"
  | "bone_health"
  | "cholesterol"
  | "climacteric"
  | "eye_health"
  | "fatigue_recovery"
  | "growth_and_development"
  | "immunity"
  | "improve_memory"
  | "improve_sleep_quality"
  | "intestinal_health"
  | "liquid"
  | "liver_health"
  | "nutritional_supplement"
  | "prostate"
  | "relaxation_of_tension"
  | "skin_health"
  | "stomach_health"


export interface Concern {
  id: HealthSvgSpriteID
  title: string
  supplementsList: Supplement[]
  contents: string[]
}

export interface ConcernWithBase64 extends Concern {
  supplementsList: {
    supplementName: string
    imageURL: string
    base64: string
  }[]
}

export interface Item {
  title: string,
  link: string,
  image: string, 
  lprice: string, 
  hprice: string,
  mallName: string,
  productId: string, 
  productType: string, 
  brand: string, 
  maker: string, 
  category1: string, 
  category2: string, 
  category3: string, 
  category4: string, 
  base64?: string
}