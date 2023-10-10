'use server'

import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { start } from 'repl'
import { PillData } from '@/types'
import { revalidatePath } from 'next/cache'

const sessionCookie = cookies().get('session')?.value || ''

export const getPills = async () => {
  const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
  if (!decodedClaims) redirect('/login')
  const { uid } = decodedClaims
  const pills = await adminFirestore.collection('users').doc(uid).collection('pills').get()
  const data = pills.docs.map((doc) => {
    const data = doc.data()
    return { ...data, 
      id: doc.id, 
      startDate: data.startDate.toDate(), 
      endDate: data.endDate?.toDate() ?? null,
      createdAt: data.createdAt.toDate(),
    } as PillData
  })
  return data
}

export const deletePill = async (id: string) => {
  const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
  if (!decodedClaims) redirect('/login')
  const { uid } = decodedClaims
  await adminFirestore.collection('users').doc(uid).collection('pills').doc(id).delete()
  revalidatePath('/dashboard')
}

export const getPill = async (id: string) => {
  const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
  if (!decodedClaims) redirect('/login')
  const { uid } = decodedClaims
  const pill = await adminFirestore.collection('users').doc(uid).collection('pills').doc(id).get()
  const data = pill.data()
  console.log(data)

  // return { ...data, 
  //   id: pill.id, 
  //   startDate: data.startDate.toDate(), 
  //   endDate: data.endDate?.toDate() ?? null,
  //   createdAt: data.createdAt.toDate(),
  // } as PillData
}

