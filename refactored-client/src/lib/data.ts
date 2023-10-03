'use server'

import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { Pill } from '@/types'
import { addPillSchema } from '@/zodSchema/addPills'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const createData = async (prevFormState: any, formData: FormData) => {
  console.log('prevFormState', prevFormState)
  console.log('formData', formData)
  console.log('getall',formData.getAll('ingredients'))
  console.log('getalltime',formData.getAll('takingTime'))

  //https://github.com/remix-run/remix/discussions/1298
  switch (formData.get('type')) {
    case 'update_ingredients':
      return {
        ...prevFormState,
        ingredients: [
          ...prevFormState.ingredients,
          formData.get('ingredients'),
        ],
      }
    case 'update_takingTime':
      return {
        ...prevFormState,
        takingTime: [...prevFormState.takingTime, formData.get('takingTime')],
      }
    case 'create':
      const schema = z.object({
        supplementName: z.string(),
        ingredients: z.array(z.string().nullable()),
        productType: z.string(),
        formulation: z.string(),
        expirationDate: z.string().nullable(),
        startDate: z.string().default(new Date().toISOString().slice(0, 10)),
        endDate: z.string(),
        takingTime: z.array(z.string().nullable()),
        pillsLeft: z.coerce.number(),
        totalCapacity: z.coerce.number(),
        servingSize: z.coerce.number(),
      })
      const updatedFormState = {
        ...Object.fromEntries(
          Object.entries(prevFormState).map(([key, prevValue]) => {
            const formDataValue = key==="takingTime" || key==="ingredients" ?formData.getAll(key): formData.get(key)
            //takingTime, ingredients은 배열이므로 getAll로 모두 뽑는다
            return [
              key,
              prevValue !== formDataValue ? formDataValue : prevValue,
            ]
          }),
        ),
      }
      console.log('updatedFormState', updatedFormState)
      const expirationDate = `${formData.get(
        'expirationDate_year',
      )}-${formData.get('expirationDate_month')}${formData.get(
        'expirationDate_day',
      )}}`
      formData.set('expirationDate', expirationDate)

      try {
        const parsedData = schema.safeParse(updatedFormState)
        console.log('parsedData', parsedData)
        revalidatePath('/create')
        return updatedFormState
      } catch (e) {
        console.log('error', e)
        return prevFormState
      }
  }

  // finally{
  //   console.log('finally')
  //   revalidatePath('./create')
  //   redirect('./create') //  'dashboard/create'로 입력하면 /dashboard/dashboard/create로 된다. 상대경로라 그런듯
  // }
}

export const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  const form = e.currentTarget
  const formData = new FormData(form)
  console.log(formData)
  await formAction(formData)
  revalidatePath('/dashboard/create')
  redirect('/dashboard/create')
}

