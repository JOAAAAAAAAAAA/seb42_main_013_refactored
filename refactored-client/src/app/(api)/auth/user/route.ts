import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin';
import { firestore } from '@/firebase/firebaseApp';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const decodedClaims = await adminAuth.verifySessionCookie(session, true);
  const uid = decodedClaims.uid;
  const userRef = adminFirestore.collection('users').doc(uid);
  const user = await userRef.get();
  console.log('user',user)
  console.log(user.QueryDocumentSnapshot._fieldsProto)

}
 