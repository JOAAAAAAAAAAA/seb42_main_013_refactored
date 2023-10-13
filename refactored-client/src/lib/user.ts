import { User, AuthUser } from "@/types"
import { verify } from "crypto"
import { cookies } from "next/headers"
import { verifySessionCookie } from "./auth"
import { adminFirestore } from "@/firebase/firebaseAdmin"
import { redirect } from "next/navigation"

export const getUserClient = async () => {
  "use client"
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/user`, {
    method: 'GET',
    //no cache for dynamic redner
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      'cookie': `session=${sessionCookie}`,
    },
  })

  if (res.status === 200) {
    const data = await res.json()
    const user = data.user as User
    return user
  }
  } catch (error) {
    console.error(error)
  }
}

export const getUserInServer = async () => {
  "use server"
  try{
    const decodedClaims = await verifySessionCookie()
    if (!decodedClaims) redirect('/login')
    const userRef = adminFirestore.collection('users').doc(decodedClaims.uid).collection('userInfo').doc(decodedClaims.uid)
    const doc = await userRef.get()
    const snapshot = doc.data() 
    const user = {
      ...snapshot,
      lastLoginAt: snapshot?.lastLoginAt.toDate(),
    } as AuthUser
    return user
  }catch(e){
    console.error(e)
  }
}