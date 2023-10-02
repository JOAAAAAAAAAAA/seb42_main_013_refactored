'use server'

import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { Pill } from '@/types'
import { addPillSchema } from '@/zodSchema/addPills'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const createData = async (prevFormState: any, formData: FormData) => {
  // const data = addPillSchema.parse({
  //   pill: formData.get('pill'),
  // })
  console.log('prevFormState', prevFormState)
  console.log('formData', formData)

  const updatedFormState = Object.fromEntries(
    Object.entries(prevFormState).map(([key, prevValue]) => {
      const formDataValue = formData.get(key)

      return [key, prevValue !== formDataValue ? formDataValue : prevValue]
    })
  )

  // formData.delete('$ACTION_REF_1')
  // formData.delete('$ACTION_1:1')
  // formData.delete('$ACTION_1:0')
  // formData.delete('$ACTION_KEY')
  // console.log('entries', Object.fromEntries(formData.entries()))
  console.log('result',updatedFormState)
  return updatedFormState
  // try {
  //   // const decodedClaims = await adminAuth.verifySessionCookie(session, true)
  //   // const pillRef = adminFirestore.collection(decodedClaims.uid)
  //   // await pillRef.add(data)
  //   revalidatePath('/dashboard')
  //   return updatedFormState
  // } catch (e) {
  //   return prevFormState
  // }
}

export const deleteData = async (formData: FormData, session: string) => {
  const data = addPillSchema.parse({
    pill: formData.get('pill'),
  })
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(session, true)
    const pillRef = adminFirestore.collection(decodedClaims.uid).doc(data.id)
    await pillRef.delete()
    revalidatePath('/dashboard')
    redirect('/dashboard')
    return { message: `Deleted data ${data}` }
  } catch (e) {
    return prevFormState
  }
}
