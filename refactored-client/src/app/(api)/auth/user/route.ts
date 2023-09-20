import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin';
import { firestore } from '@/firebase/firebaseApp';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('get user!!!!!!!!!!!!!!')
  console.log('request',request)
  console.log('cookies',request.cookies)
  console.log('sessioncookie',request.cookies.get("session"))
  console.log('.value',request.cookies.get("session")?.value)
  const session = request.cookies.get("session")?.value || '';
  console.log('session',session)
  // 아래 리다이렉트는 server-side redirect 만 발생한다 
  if (!session) {
    console.log('session cookie not found')
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const decodedClaims = await adminAuth.verifySessionCookie(session, true);
  if (!decodedClaims) {
    console.log('session cookie expired')
    return NextResponse.json({ message: "session cookie expired" }, { status: 401 });
  }
  console.log('decodedClaims',decodedClaims)
  const userRef = adminFirestore.collection('users').doc(decodedClaims.uid);
  const user = await userRef.get();
  console.log('user',user)

  // const res = new NextResponse({ body, status: 200 })
  return new NextResponse()

}
 