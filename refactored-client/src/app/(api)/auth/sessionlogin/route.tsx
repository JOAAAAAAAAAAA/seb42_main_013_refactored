import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from 'firebase-admin/firestore';
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { adminAuth } from "@/firebase/firebaseAdmin";




//api documents from 
//https://auth-docs-git-feat-nextjs-auth-authjs.vercel.app/reference/nextjs#in-route-handlers

// export const POST = auth(async(req:NextRequest) => {
//   console.log('customreq!!!!!!!!!!!!!!!!!!!!!!!!!!', req)
// return NextResponse.json({ isLogged: true }, { status: 200 });
// })


// 기존 함수


// TODO: 최적화하기 너무 오래걸림
export async function POST(req: NextRequest) {
  try {
    //!idToken 검증
    console.log('idToken 검증')
    const authorization = req.headers.get("Authorization");
    if (!authorization) return NextResponse.json({ message: "no idToken found" }, { status: 401 })

    const idToken = authorization.split("Bearer ")[1];
    const decodedIDToken = await adminAuth.verifyIdToken(idToken)
    if (!decodedIDToken) return NextResponse.json({ message: "UNAUTHORIZED REQUEST" }, { status: 401 })

    //https://googleapis.dev/nodejs/firestore/latest/FieldValue.html#.serverTimestamp
    const user = {
      uid: decodedIDToken.uid,
      email: decodedIDToken.email,
      displayName: decodedIDToken.name,
      photoURL: decodedIDToken.picture,
      lastLoginAt: FieldValue.serverTimestamp(),
    }
    //!유저 정보 저장
    console.log('유저 정보 저장')
    const userRef = adminFirestore.collection('users').doc(decodedIDToken.uid).collection('userInfo').doc(decodedIDToken.uid)
    //doc parameter (reference to the document, path, pathSegments)
    await userRef.set(user,{ merge: true })
    //SetOptions parameter (merge: boolean, mergeFields: string[])
    //기존 데이터에 덮어쓰거나 없으면 신규 데이터 생성

    //!세션쿠키 생성
    console.log('세션쿠키 생성')
    const expiresIn = 1000 * 60 * 60 * 24 * 5; //1day
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });
    const resbody = {
      user,
      message: "login success",
    }
    const res = new NextResponse(JSON.stringify(resbody), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      }
    })
    res.cookies.set("session", sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });
    res.cookies.delete("csrf-token")
    return res
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Add user incomplete" }, { status: 500 })
  }
  // const res = NextResponse.redirect(new URL("/summary", req.url))
}

//유저 authenticate
export async function GET(req: NextRequest) {
  //https://firebase.google.com/docs/auth/admin/manage-cookies#verify_session_cookie_and_check_permissions
  //case 1 session cookie가 없는 경우
  const session = req.cookies.get("session")?.value || "";
  if (!session) {
    return NextResponse.json({ message: "no session cookie" }, { status: 401 });
  }
  //case 2 session cookie가 있지만, 만료된 경우
  try {
    const decodedClaims = await adminAuth.verifySessionCookie(session, true);
    if (!decodedClaims) {
      return NextResponse.json({ message: "session cookie expired" }, { status: 401 });
    }
    return NextResponse.json({ isLogin: true }, { status: 200 });
  } catch (error) {
    //verifySessionCookie(sessionCookie: string, checkRevoked?: boolean): Promise<DecodedIdToken>;
    return NextResponse.json(error, { status: 401 });
  }
}
