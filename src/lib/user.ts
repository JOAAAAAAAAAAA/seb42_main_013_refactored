import { verify } from 'crypto'
import { adminFirestore } from '@/firebase/firebaseAdmin'
import { AuthUser, User } from '@/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionCookie } from './auth'
import { revalidatePath, revalidateTag } from 'next/cache'

export const getUserClient = async () => {
  'use client'
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/user`, {
      method: 'GET',
      //no cache for dynamic redner
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
        cookie: `session=${sessionCookie}`,
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
  'use server'
  const decodedClaims = await verifySessionCookie()
  if (!decodedClaims) redirect('/login')
  const userRef = adminFirestore
    .collection('users')
    .doc(decodedClaims.uid)
    .collection('userInfo')
    .doc(decodedClaims.uid)
  const doc = await userRef.get()
  const snapshot = doc.data()
  const user = {
    ...snapshot,
    lastLoginAt: snapshot?.lastLoginAt.toDate(),
  } as AuthUser
  return user
}

export const updateUserConcerns = async (
  authUser: AuthUser,
  formData: FormData,
) => {
  'use server'
  const concerns = formData.getAll('concerns')
  console.log('concerns', concerns)
  const newUserInfo = {
    ...authUser,
    concerns: concerns,
  }
  const decodedClaims = await verifySessionCookie()
  if (!decodedClaims) redirect('/login')
  const userRef = adminFirestore
    .collection('users')
    .doc(decodedClaims.uid)
    .collection('userInfo')
    .doc(decodedClaims.uid)
  const res =  await userRef.update(newUserInfo)
  console.log(res)
  revalidatePath('/mypage')
  redirect('/mypage')
}
