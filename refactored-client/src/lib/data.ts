'use server'
import { z } from "zod";

import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { Pill } from '@/types'
import { addPillSchema } from '@/zodSchema/addPills'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const createData = async ( prevFormState: any, formData: FormData) => {

  console.log('prevFormState', prevFormState)
  console.log('formData', formData)
  // const expirationDate = `${formData.get('expirationDate_year')}-${formData.get('expirationDate_month')}${formData.get('expirationDate_day')}}`
  // formData.set('expirationDate',expirationDate)

  switch (formData.get("type")) {
    case "update_ingredients":
      return {...prevFormState,
        ingredients: [...prevFormState, formData.get('ingredients')]}  
      break;

    case "update_takingTime":
      return {...prevFormState,
        takingTime: [...prevFormState, formData.get('takingTime')]}  
      break;
    case "create":
      break;
  }





  // const schema = z.object({
  //   supplementName: z.string(),
  //   ingredients: z.array(z.string().nullable()),
  //   productType: z.string(),
  //   formulation: z.string(),
  //   expirationDate: z.string().nullable(),
  //   startDate: z.string().default(new Date().toISOString().slice(0, 10)),
  //   endDate: z.string(),
  //   takingTime: z.array(z.string().nullable()),
  //   pillsLeft: z.coerce.number(),
  //   totalCapacity: z.coerce.number(),
  //   servingSize: z.coerce.number(),
  // })
  // const updatedFormState = {...Object.fromEntries(
  //   Object.entries(prevFormState).map(([key, prevValue]) => {
  //     const formDataValue = formData.get(key)
  //     return [key, prevValue !== formDataValue ? formDataValue : prevValue]
  //   })
  // ),

  // console.log('updatedFormState',updatedFormState)
  // try {
  //   const data = schema.parse(updatedFormState)
  //   return updatedFormState

  // }catch(e){
  //   console.log('error',e)
  // }

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


export const deleteData = async (formData: FormData, session: string, ) => {
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
