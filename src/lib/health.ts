"use server"
import { Concern, Supplement, ConcernWithBase64 } from "@/types"
import { adminFirestore } from "@/firebase/firebaseAdmin"
import {  DocumentData } from "firebase-admin/firestore"
import { getBase64 } from "./base64"


//server action으로 대체
//allows the form to function without JavaScript


// export const postHealthData = async (sessionCookie: string, data:Concern) => {
//   //   const sessionCookie = cookies().get('session')?.value || ""
//   //   로 담아야 한다
//   const csrfToken = await fetch("/api/auth/csrf")
//   const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/health`,{
//     method: 'POST',
//     cache: 'no-store',
//     headers: {
//       'Content-Type': 'application/json',
//       'cookie': `session=${sessionCookie}`,
//     },
//     body: JSON.stringify(data)
//   })
// }

// export const getHealthData = async (): Promise<Concern[]> => {
//   try {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/health`,{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     if(res.status === 200){
//       const healthConcern :Concern[] = await res.json() 
//       // const result = await new Promise ((resolve) => { setTimeout(resolve, 10000) })
//       return healthConcern
//     }
//     //다 throw 시켜서 <Await>에서 Generic으로 undefined 안받게 하기
//     throw new Error('Failed to fetch health data');
//   } catch (error) {
//     console.error(error)
//     throw error
//   }
// }

export const getHealthData = async (): Promise<Concern[]> => {
  const healthRef = adminFirestore.collection('health');
  const snapshot = await healthRef.get();
  const data = snapshot.docs.map((doc) => doc.data()) as Concern[];
  return data;
}



export const getHealth = async (): Promise<ConcernWithBase64[]> => {
  const data = await getHealthData();
  // base64 병렬처리
  const base64Promises = data.map(async (concern: Concern) => {
    const supplementsWithBase64 = await Promise.all(
      concern.supplementsList.map(async (supplement: Supplement) => {
        const base64 = await getBase64(supplement.imageURL);
        return { ...supplement, base64 };
      }),
    );
    return { ...concern, supplementsList: supplementsWithBase64 };
  });

  const result = await Promise.all(base64Promises);
  return result;
};