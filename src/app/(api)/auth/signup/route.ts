import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from 'firebase-admin/firestore';
import { adminFirestore } from "@/firebase/firebaseAdmin";
import { adminAuth } from "@/firebase/firebaseAdmin";


// TODO: 최적화하기 너무 오래걸림
export async function POST(req: NextRequest) {
  try {
    //!idToken 검증
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
    const userRef = adminFirestore.collection('users').doc(decodedIDToken.uid).collection('userInfo').doc(decodedIDToken.uid)
    //doc parameter (reference to the document, path, pathSegments)
    await userRef.set(user,{ merge: true })
    //SetOptions parameter (merge: boolean, mergeFields: string[])
    //기존 데이터에 덮어쓰거나 없으면 신규 데이터 생성

    //!세션쿠키 생성
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
