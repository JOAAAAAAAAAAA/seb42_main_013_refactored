"use server"
import { Concern } from '@/types'
// ReferenceError: require is not defined
// 오류 발생함
import {  DocumentData } from "firebase-admin/firestore"
import { getPlaiceholder } from 'plaiceholder'

export async function getBase64(imgUrl: string) {
  let base64 =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8++TddwAI/QOoDfU+RQAAAABJRU5ErkJggg=='
  try {
    const res = await fetch(imgUrl)
    if (!res.ok) {
      console.error('Failed to fetch image for base64')
      return base64
    }
    const buffer = await res.arrayBuffer()
    const result = await getPlaiceholder(Buffer.from(buffer))
    base64 = result.base64
  } catch (error) {
    console.error(error)
    throw error
  }
  return base64
}

// export async function getBase64(imgUrl: string) {
//   let temp = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8++TddwAI/QOoDfU+RQAAAABJRU5ErkJggg=='
//   try {
//     const res = await fetch(imgUrl)
//     if(!res.ok){
//       console.error('Failed to fetch image for base64')
//       return temp
//     }
//     const buffer = await res.arrayBuffer()
//     const {base64} = await getPlaiceholder(Buffer.from(buffer),{ size: 10 })
//     return base64
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

// export async function healthToBase64(data) {
//   try {
//     const base64Promises = data.map(async (concern) => {
//       const supplementsWithBase64 = await Promise.all(
//         concern.supplementsList.map(async (supplement) => {
//           const base64 = await getBase64(supplement.imageURL)
//           return { ...supplement, base64 }
//         }),
//       )
//       return { ...concern, supplementsList: supplementsWithBase64 }
//     })
//     const result = await Promise.all(base64Promises)
//     return result
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }
