'use server'

import { adminFirestore } from '@/firebase/firebaseAdmin'
import { PillData } from '@/types'
import { revalidatePath } from 'next/cache'
import { verifySessionCookie } from './auth'

export const getPills = async () => {
  const decodedClaims = await verifySessionCookie()
  if(decodedClaims){
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
  }
}

export const deletePill = async (id: string) => {
  const decodedClaims = await verifySessionCookie()
  if(decodedClaims){
    const { uid } = decodedClaims
    await adminFirestore
      .collection('users')
      .doc(uid)
      .collection('pills')
      .doc(id)
      .delete()
    revalidatePath('/summary')
  }
}

export const getPill = async (id: string) => {
  const decodedClaims = await verifySessionCookie()
  if(decodedClaims){  
    const { uid } = decodedClaims
    const pill = await adminFirestore
      .collection('users')
      .doc(uid)
      .collection('pills')
      .doc(id)
      .get()
    const data = pill.data()
    delete data?.createdAt
    return {
      ...data,
      id: pill.id,
      startDate: data?.startDate.toDate(),
      endDate: data?.endDate?.toDate() ?? null,
      createdAt: data?.createdAt?.toDate(),
    } as PillData
  }
}
