'use server'

import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { Pill } from '@/types'
import { addPillSchema } from '@/zodSchema/addPills'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const createData = async (prevFormState: Pill, formData: FormData) => {

  //https://github.com/remix-run/remix/discussions/1298
  switch (formData.get('type')) {
    case 'update_ingredients':
      const ingredient = formData.get('ingredients')
      if (
        typeof ingredient === 'string' &&
        !prevFormState.ingredients.includes(ingredient)
      ) {
        //중복값 입력 안되게
        return {
          ...prevFormState,
          ingredients: [...prevFormState.ingredients, ingredient],
        }
      } else {
        return prevFormState
      }
    case 'update_takingTime':
      const time = formData.get('takingTime')
      if (
        typeof time === 'string' &&
        !prevFormState.takingTime.includes(time)
      ) {
        //중복값 입력 안되게
        return {
          ...prevFormState,
          takingTime: [...prevFormState.takingTime, time],
        }
      } else {
        return prevFormState
      }
    case 'deleteChip':
      const fieldsetName = formData.get('fieldsetName')
      const value = formData.get('value')
      if (fieldsetName === 'takingTime' || fieldsetName === 'ingredients') {
        const filtered = prevFormState[fieldsetName].filter(
          (ele) => ele !== value,
        )
        // revalidatePath('/create')
        // useFormState랑 엮어놔서 revalidate 안해도 해당 컴포넌트 리렌더링됨
        return {
          ...prevFormState,
          [fieldsetName]: [...filtered],
        }
      } else return prevFormState
    case 'create':
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
      const year = formData.get('expirationDate_year') ?? ''
      const month = formData.get('expirationDate_month') ?? ''
      const day = formData.get('expirationDate_day') ?? ''
      if (
        typeof year === 'string' &&
        typeof month === 'string' &&
        typeof day === 'string'
      ) {
        const expirationDate = `${year}-${month}-${day}`
        formData.set('expirationDate', expirationDate)
      }

      //타입 이슈 해결
      const prev = Object.entries(prevFormState)
      const updated = prev.map(([key, prevValue]) => {
        const newValue =
          key === 'takingTime' || key === 'ingredients'
            ? formData.getAll(key)
            : formData.get(key)
        //takingTime, ingredients은 배열이므로 getAll로 모두 뽑는다
        return [key, prevValue !== newValue ? newValue : prevValue]
      })
      const updatedFormState = Object.fromEntries(updated)
      console.log('updatedFormState', updatedFormState)

      const parsedData = schema.safeParse(updatedFormState)
      console.log('parsedData', parsedData)
      //해당 url방문시에 revalidate 되는 거라 먼저 선언해도 괜찮
      return updatedFormState
    default:
      return prevFormState
  }
}
