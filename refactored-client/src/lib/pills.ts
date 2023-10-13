'use server'

import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { PillData } from '@/types'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifySessionCookie } from './auth'

export const getPills = async () => {
  try{
    const decodedClaims = await verifySessionCookie()
    if (!decodedClaims) redirect('/login')
    const { uid } = decodedClaims
    const pills = await adminFirestore.collection('users').doc(uid).collection('pills').get()
    const data = pills.docs.map((doc) => {
      const parsedDoc = doc.data()
      return {
        ...parsedDoc,
        id: doc.id,
        startDate: parsedDoc.startDate.toDate(),
        endDate: parsedDoc.endDate?.toDate() ?? null,
        createdAt: parsedDoc.createdAt.toDate(),
      } as PillData
    })
    return data
  }catch(e){
    console.error(e)
  }
}

export const deletePill = async (id: string) => {
  const decodedClaims = await verifySessionCookie()
  if (!decodedClaims) redirect('/login')
  const { uid } = decodedClaims
  await adminFirestore
    .collection('users')
    .doc(uid)
    .collection('pills')
    .doc(id)
    .delete()
  revalidatePath('/summary')
}

export const getPill = async (id: string) => {
  // const decodedClaims = await verifySessionCookie(sessionCookie)
  // if (!decodedClaims) redirect('/login')
  // const { uid } = decodedClaims
  // const pill = await adminFirestore
  //   .collection('users')
  //   .doc(uid)
  //   .collection('pills')
  //   .doc(id)
  //   .get()
  // const data = pill.data()
  // delete data?.createdAt
  // return {
  //   ...data,
  //   id: pill.id,
  //   startDate: data?.startDate.toDate(),
  //   endDate: data?.endDate?.toDate() ?? null,
  //   createdAt: data?.createdAt?.toDate(),
  // } as PillData
}
