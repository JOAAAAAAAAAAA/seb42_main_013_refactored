'use server'

import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { Pill } from '@/types'
import { addPillSchema } from '@/zodSchema/addPills'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ZodError, z} from 'zod'


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
     
      //타입 이슈 해결
      const prev = Object.entries(prevFormState)
      const updated = prev.map(([key, prevValue]) => {
        const newValue =
          key === 'takingTime' || key === 'ingredients'
            ? formData.getAll(key)
            : formData.get(key)
        //takingTime, ingredients은 배열이므로 getAll로 모두 뽑는다
        return [
          key,
          prevValue !== newValue && newValue !== null ? newValue : prevValue,
        ]
      })
      const updatedFormState = Object.fromEntries(updated)

      //유효성 검사
      const parsedData = addPillSchema.safeParse(updatedFormState)
      console.log('parsedData', parsedData)

      if (!parsedData.success) {
        const flattenMessage = parsedData.error.flatten((issue) => ({
          message: issue.message,
          errorCode: issue.code,
        })).fieldErrors
        return { ...updatedFormState, errorMessage: flattenMessage }
      }
      //해당 url방문시에 revalidate 되는 거라 먼저 선언해도 괜찮
      else return updatedFormState
    default:
      return prevFormState
  }
}


const postPill = async (data: Pill) => {

  const sessionCookie = cookies.get('session')?.value
  console.log('sessionCookie', sessionCookie)
  const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
  const { uid } = decodedClaims
  const pillRef = adminFirestore.collection('pills').doc(uid)
  await pillRef.set(data, { merge: true })
}