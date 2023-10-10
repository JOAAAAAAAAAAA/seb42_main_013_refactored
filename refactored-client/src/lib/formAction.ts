'use server'

import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { FormState } from '@/types'
import { addPillSchema } from '@/zodSchema/addPills'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import z from 'zod'
import { FieldValue } from 'firebase-admin/firestore';



export const createData = async (prevFormState: FormState, formData: FormData) => {
  console.log('실행중')
  //https://github.com/remix-run/remix/discussions/1298
  switch (formData.get('type')) {
    case 'update_ingredients':
      console.log('update trigger')
      const ingredient = formData.get('ingredients')
      //중복체크
      const updatIngredientsSchema = z.string().refine((val) => {
        return !prevFormState.ingredients.includes(val)
      })
      const parsedIngredient = updatIngredientsSchema.safeParse(ingredient)
      if(!parsedIngredient.success){

        return {...prevFormState, errorMessage:{ingredients:[{message:'중복된 성분입니다.',errorCode:"already_exists"}]}}
      }else {
        return {
          ...prevFormState,
          ingredients: [...prevFormState.ingredients, ingredient],
        }
      }
    case 'update_takingTime':
      const time = formData.get('takingTime')
      //중복체크
      const updateTakingTimeSchema = z.string().refine((val) => {
        return !prevFormState.ingredients.includes(val)
      })
      const parsedTime = updateTakingTimeSchema.safeParse(time)
      if(!parsedTime.success){
        return {...prevFormState, errorMessage:{takingTime:[{message:'이미 존재하는 시간입니다.',errorCode:"already_exists"}]}}
      }else {
        return {
          ...prevFormState,
          takingTime: [...prevFormState.takingTime, time],
        }
      }
    case 'deleteChip':
      const fieldsetName = formData.get('fieldsetName')
      const value = formData.get('value')
      if (fieldsetName === 'takingTime' || fieldsetName === 'ingredients') {
        const filtered = prevFormState[fieldsetName].filter(
          item => item !== value)
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


      if (!parsedData.success) {
        const flattenMessage = parsedData.error.flatten((issue) => ({
          message: issue.message,
          errorCode: issue.code,
        })).fieldErrors
        return { ...updatedFormState, errorMessage: flattenMessage }
      }
      try {
        const sessionCookie = cookies().get('session')?.value || ''
        const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
        if (!decodedClaims) redirect('/create?session=expired')
        const { uid } = decodedClaims
        const pillRef = adminFirestore
          .collection('users')
          .doc(uid)
          .collection('pills')
        
        //pillRef에 createdAt 추가

        await pillRef.add({...parsedData.data, createdAt:FieldValue.serverTimestamp()})
        console.log('등록완료')
      } catch (e) {
        console.error(e)
      }finally{
        revalidatePath('/summary')
        redirect('/summary')
      }

    //해당 url방문시에 revalidate 되는 거라 먼저 선언해도 괜찮
    default:
      return prevFormState
  }
}

