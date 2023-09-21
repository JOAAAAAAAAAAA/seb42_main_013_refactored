import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin';
import { firestore } from '@/firebase/firebaseApp';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

interface Concern {
  stringValue: string;
  valueType: string;
}

export async function GET(request: NextRequest) {

  const session = request.cookies.get("session")?.value || '';
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
  const userRef = adminFirestore.collection('users').doc(decodedClaims.uid);
  const {
    _fieldsProto: {
      uid: { stringValue: uid },
      email: { stringValue: email },
      displayName: { stringValue: displayName },
      photoURL: { stringValue: photoURL },
      concerns: { arrayValue: { values: concernsArray } }
    }
  } = await userRef.get();

  const concerns = concernsArray.map((concern:Concern) => concern.stringValue);
  const user = {
    uid,
    email,
    displayName,
    photoURL,
    concerns
  };

  return NextResponse.json({ user });
}
 