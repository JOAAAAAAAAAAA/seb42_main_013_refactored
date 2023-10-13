"use server"
import { AuthUser } from "@/types";
import { User, getRedirectResult, inMemoryPersistence, onAuthStateChanged, setPersistence, signInWithRedirect } from "firebase/auth";
import React, { createContext, use, useEffect, useReducer, useState } from "react";
import { app, auth, googleAuthProvider } from "../firebase/firebaseApp";
import { addUserToFirestore } from "../firebase/userController";
import { useRouter } from "next/navigation";
import {initializeAuth, browserLocalPersistence, browserPopupRedirectResolver, browserSessionPersistence, indexedDBLocalPersistence} from "firebase/auth";
import { revalidatePath } from "next/cache";
import Loading from "@/context/loading";
import { redirect } from 'next/navigation'
import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { cookies } from "next/headers";


export const sessionLogout = () => {
  console.log('로그아웃')
  cookies().delete('session')
  redirect("/login")
}

export const verifySessionCookie = async (sessionCookie: string) => {
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
    return decodedClaims
  } catch (error) {
    if (error.code === 'auth/session-cookie-expired') redirect('/login')
  }
}