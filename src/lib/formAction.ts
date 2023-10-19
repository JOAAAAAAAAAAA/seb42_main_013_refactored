'use server'

import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { FormState } from '@/types'
import { addPillSchema } from '@/zodSchema/addPills'
import { FieldValue } from 'firebase-admin/firestore'
import { revalidatePath } from 'next/cache'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'
import { verifySessionCookie } from './auth'
import { verifyCSRFToken } from './csrf'

export const createData = async (
  prevFormState: FormState,
  formData: FormData,
) => {

  const cookieValue = cookies().get('csrf-token')?.value || ''
  const bodyValue = formData.get('csrfToken') || ''
  const csrfTokenVerified = await verifyCSRFToken({
    cookieValue: cookieValue,
    bodyValue: bodyValue.toString(),
  })

  if(!csrfTokenVerified) redirect('/create?error=invalidCSRFToken')

  // https://github.com/remix-run/remix/discussions/1298
  switch (formData.get('type')) {
    case 'update_ingredients': {

      try {
        const ingredient = formData.get('ingredients')
        //중복체크
        const updatIngredientsSchema = z.string().refine((val) => {
          return !prevFormState.ingredients.includes(val)
        })
        const parsedIngredient = updatIngredientsSchema.safeParse(ingredient)

        if (!parsedIngredient.success) {
          return {
            ...prevFormState,
            errorMessage: {
              ingredients: [
                { message: '중복된 성분입니다.', errorCode: 'already_exists' },
              ],
            },
          }
        } else {
          return {
            ...prevFormState,
            ingredients: [...prevFormState.ingredients, ingredient],
          }
        }
      } catch (e) {
        console.error('업데이트 에러발생', e)
      }
      break
    }

    case 'update_takingTime': {
      const time = formData.get('takingTime')
      //중복체크
      const updateTakingTimeSchema = z.string().refine((val) => {
        return !prevFormState.takingTime.includes(val)
      })
      const parsedTime = updateTakingTimeSchema.safeParse(time)
      if (!parsedTime.success) {
        return {
          ...prevFormState,
          errorMessage: {
            takingTime: [
              {
                message: '이미 존재하는 시간입니다.',
                errorCode: 'already_exists',
              },
            ],
          },
        }
      } else {
        return {
          ...prevFormState,
          takingTime: [...prevFormState.takingTime, time],
        }
      }
      break
    }

    case 'deleteChip': {
      const fieldsetName = formData.get('fieldsetName')
      const value = formData.get('value')
      if (fieldsetName === 'takingTime' || fieldsetName === 'ingredients') {
        const filtered = prevFormState[fieldsetName].filter(
          (item) => item !== value,
        )
        return {
          ...prevFormState,
          [fieldsetName]: [...filtered],
        }
      } else return prevFormState
      break
    }

    case 'create': {
      //타입 이슈 해결

      //update formData
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

      if (!parsedData.success) {
        const flattenMessage = parsedData.error.flatten((issue) => ({
          message: issue.message,
          errorCode: issue.code,
        })).fieldErrors
        return { ...updatedFormState, errorMessage: flattenMessage }
      }
      try {
        const decodedClaims = await verifySessionCookie()
        if (!decodedClaims) redirect('/create?error=invalidToken')
        const { uid } = decodedClaims
        const pillRef = adminFirestore
          .collection('users')
          .doc(uid)
          .collection('pills')

        //pillRef에 createdAt 추가
        await pillRef.add({
          ...parsedData.data,
          createdAt: FieldValue.serverTimestamp(),
        })
        revalidatePath('/summary')
      } catch (error) {
        if (error.code === 'auth/session-cookie-expired')
          redirect('/create?error=sessionExpired')
        else redirect('/create?error=unknown')
      } finally {
        redirect('/summary')
      }
      break
    }

    case 'update': {
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

      if (!parsedData.success) {
        const flattenMessage = parsedData.error.flatten((issue) => ({
          message: issue.message,
          errorCode: issue.code,
        })).fieldErrors
        return { ...updatedFormState, errorMessage: flattenMessage }
      }
      try {
        const decodedClaims = await verifySessionCookie()
        if(decodedClaims && prevFormState.id){
          const { uid } = decodedClaims
          const pillRef = adminFirestore
            .collection('users')
            .doc(uid)
            .collection('pills')
            .doc(prevFormState.id)
          //pillRef에 createdAt 추가
          await pillRef.update(
            { ...parsedData.data, createdAt: FieldValue.serverTimestamp() },
          )
        }
      } catch (e) {
        console.error(e)
      } finally {
        revalidatePath('/summary')
        redirect('/summary')
      }
      break
    }
    default:
      return prevFormState
  }
}

const validateFormData = (formData, schema) => {
  const parsedData = schema.safeParse(formData)
  if (!parsedData.success) {
    const flattenMessage = parsedData.error.flatten((issue) => ({
      message: issue.message,
      errorCode: issue.code,
    })).fieldErrors
    throw new Error({ ...formData, errorMessage: flattenMessage })
  }
}
