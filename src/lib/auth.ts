'use server'

import { adminAuth } from '@/firebase/firebaseAdmin'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { FirebaseError } from 'firebase/app'

export const sessionLogout = () => {
  cookies().delete('csrf-token')
  cookies().delete('session')
}



export const verifySessionCookie = async () => {
  const sessionCookie = cookies().get('session')?.value || ''
  if (!sessionCookie) redirect('/login?error=no-session-cookie')
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie,
      true,
    )
    return decodedClaims
  } catch (error: any) {
    if (error instanceof FirebaseError){
      if (error.code === 'auth/session-cookie-expired') redirect('/login?error=session-cookie-expired')
      console.error(error)
    }
  }
}


// form 을 통해서 trigger 되지 않은 function 은 serverActionXX -> cookie 변경이 안됨
// const sessionCookie = cookies().get('session')?.value || ''
// if(!sessionCookie)redirect('/login?error=no-session-cookie')
// try {
  //   const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie, true)
  //   return decodedClaims
  // } catch (error) {
    //   if (error.code === 'auth/session-cookie-expired') {
      //     console.log('session-cookie-expired')
      //     cookies().delete('csrf-token')
      //     cookies().delete('session')
      //     redirect('/login?error=session-cookie-expired')
      //   }
      // }