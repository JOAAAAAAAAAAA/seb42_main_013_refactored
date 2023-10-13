import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { AuthUser } from '@/types'
import { doc } from 'firebase/firestore/lite'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import nodata from '@/../public/images/NoSupplementData.png'

interface Concern {
  stringValue: string
  valueType: string
}

export async function GET(request: NextRequest) {
  const session = request.cookies.get('session')?.value || ''
  // 아래 리다이렉트는 server-side redirect 만 발생한다
  if (!session) {
    console.log('session cookie not found')
    return NextResponse.redirect(new URL('/login', request.url))
  }
  const decodedClaims = await adminAuth.verifySessionCookie(session, true)
  if (!decodedClaims) {
    console.log('session cookie expired')
    return NextResponse.json(
      { message: 'session cookie expired' },
      { status: 401 },
    )
  }
  // const userRef = adminFirestore.collection('users').doc(decodedClaims.uid);
  // const {
  //   _fieldsProto: {
  //     uid: { stringValue: uid },
  //     email: { stringValue: email },
  //     displayName: { stringValue: displayName },
  //     photoURL: { stringValue: photoURL },
  //     concerns: { arrayValue: { values: concernsArray } }
  //   }
  // } = await userRef.get();

  const userRef = adminFirestore.collection('users').doc(decodedClaims.uid)
  const doc = await userRef.get()
  if(!doc.exists){
    return NextResponse.json({ message: 'user not found' }, { status: 404 })
  }
  const snapshot = doc.data() as AuthUser
  const { uid, email, displayName, photoURL, concerns } = snapshot

  const user = {
    uid,
    email,
    displayName,
    photoURL,
    concerns,
  }
  return NextResponse.json({ user })
}
