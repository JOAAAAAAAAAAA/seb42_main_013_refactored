import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { verifySessionCookie } from '@/lib/auth'
import { setCSRFCookie } from '@/lib/csrf'
import { FieldValue } from 'firebase-admin/firestore'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

//api documents from
//https://auth-docs-git-feat-nextjs-auth-authjs.vercel.app/reference/nextjs#in-route-handlers

// 기존 함수

// TODO: 최적화하기 너무 오래걸림
export async function POST(req: NextRequest) {
  console.log('test')
  try {
    //!idToken 검증
    const authorization = req.headers.get('Authorization')
    if (!authorization)
      return NextResponse.json(null, { status: 401, statusText: 'no idToken found' })

    const idToken = authorization.split('Bearer ')[1]
    const decodedIDToken = await adminAuth.verifyIdToken(idToken)
    if (!decodedIDToken)
      return NextResponse.json(
        null,
        { status: 401, statusText: 'UNAUTHORIZED REQUEST' },
      )
    //https://googleapis.dev/nodejs/firestore/latest/FieldValue.html#.serverTimestamp
    const user = {
      uid: decodedIDToken.uid,
      email: decodedIDToken.email,
      displayName: decodedIDToken.name,
      photoURL: decodedIDToken.picture,
      lastLoginAt: FieldValue.serverTimestamp(),
    }

    //!유저 정보 저장
    const userRef = adminFirestore
      .collection('users')
      .doc(decodedIDToken.uid)
      .collection('userInfo')
      .doc(decodedIDToken.uid)
    //doc parameter (reference to the document, path, pathSegments)
    await userRef.set(user, { merge: true })
    //SetOptions parameter (merge: boolean, mergeFields: string[])
    //기존 데이터에 덮어쓰거나 없으면 신규 데이터 생성

    //!세션쿠키 생성
    const expiresIn = 1000 * 60 * 60 * 24 //1day
    const maxAge = expiresIn / 1000
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    })
    const resbody = { user, message: 'login success' }
    const res = new NextResponse(JSON.stringify(resbody), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
    res.cookies.set('session', sessionCookie, {
      // maxAge: maxAge,//!maxAge는 millisecond가 아니라 second로 설정
      // verifysession cookie 로 대체
      httpOnly: true,
      secure: true,
    })
    setCSRFCookie(res,maxAge) //session cookie와 같은 maxAge로 설정
    // revalidatePath('/(home)', 'layout')
    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json(null, 
      { status: 500,
        statusText: 'Add user incomplete'
       },
    )
  }
  // const res = NextResponse.redirect(new URL("/summary", req.url))
}

//유저 authenticate
export async function GET(req: NextRequest) {
  //https://firebase.google.com/docs/auth/admin/manage-cookies#verify_session_cookie_and_check_permissions
  //case 1 session cookie가 없는 경우
  const session = req.cookies.get('session')?.value || ''
  if (!session) {
    return NextResponse.json(null, { status: 401, statusText: 'no session cookie' })
  }
  //case 2 session cookie가 있지만, 만료된 경우
  try {
    const decodedClaims = await verifySessionCookie()
    return NextResponse.json({ isLogin: true }, { status: 200 })
  } catch (error) {
    //verifySessionCookie(sessionCookie: string, checkRevoked?: boolean): Promise<DecodedIdToken>;
    return NextResponse.json(error, { status: 401 })
  }
}
