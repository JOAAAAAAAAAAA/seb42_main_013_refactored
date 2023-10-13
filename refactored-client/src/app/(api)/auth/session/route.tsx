import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from 'firebase-admin/firestore';
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { adminAuth } from "@/firebase/firebaseAdmin";
import { cookies } from "next/headers";



export async function POST(req: NextRequest) {
  console.log('세션생성중')
  const authorization = req.headers.get("Authorization");
  if (!authorization) return NextResponse.json({ message: "no idToken found" }, { status: 401 })
  //idToken 검증
  const idToken = authorization.split("Bearer ")[1];
  const decodedIDToken = await adminAuth.verifyIdToken(idToken)
  if (!decodedIDToken) return NextResponse.json({ message: "UNAUTHORIZED REQUEST" }, { status: 401 })

  const user = {
    uid: decodedIDToken.uid,
    email: decodedIDToken.email,
    displayName: decodedIDToken.name,
    photoURL: decodedIDToken.picture,
    lastLoginAt: FieldValue.serverTimestamp(),
  }
  //유저 정보 저장
  try {
    const userRef = adminFirestore.collection('users').doc(decodedIDToken.uid).collection('userInfo').doc(decodedIDToken.uid)
    await userRef.set(user,{ merge: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Add user incomplete" }, { status: 500 })
  }
  //세션쿠키 생성
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
  })
  cookies().set("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
  });
  cookies().delete("csrf-token")
  return res
}
