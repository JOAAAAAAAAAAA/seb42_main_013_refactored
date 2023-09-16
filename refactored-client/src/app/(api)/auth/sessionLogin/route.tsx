import { NextRequest, NextResponse } from "next/server";
import { doc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { firestore } from "@/firebase/firebaseApp";
import { adminAuth } from "@/firebase/firebaseAdmin";
import { createCSRFToken } from '/Users/bella/Coding/seb42_main_013/refactored-client/node_modules/@auth/core/lib/csrf-token';



//api documents from 
//https://auth-docs-git-feat-nextjs-auth-authjs.vercel.app/reference/nextjs#in-route-handlers

// export const POST = auth(async(req:NextRequest) => {
//   console.log('customreq!!!!!!!!!!!!!!!!!!!!!!!!!!', req)
// return NextResponse.json({ isLogged: true }, { status: 200 });
// })


// 기존 함수
export async function POST(req: NextRequest) {
  console.log('customreq!!!!!!!!!!!!!!!!!!!!!!!!!!', req)

  const authorization = req.headers.get("Authorization");
  if (!authorization) return NextResponse.json({ message: "no idToken found" }, { status: 401 })

  const cookieValue = req.cookies.get("next-auth.csrf-token")?.value
  if (!cookieValue) return NextResponse.json({ message: "no csrfToken found" }, { status: 401 })


  //idToken 검증
  const idToken = authorization.split("Bearer ")[1];
  //xx const decodedToken = await auth().verifyIdToken(idToken);
  const decodedToken = await adminAuth.verifyIdToken(idToken);

  if (!decodedToken) return NextResponse.json({ message: "UNAUTHORIZED REQUEST" }, { status: 401 })

  //csrfToken 검증
  const isPost = req.method === 'POST'
  const reqbody = await req.json()
  const csrfOptions = {
    secret: process.env.AUTH_SECRET,
  }

  const { csrfToken, cookie: csrfCookie, csrfTokenVerified, } = await createCSRFToken({
    options: csrfOptions,
    cookieValue,
    isPost,
    bodyValue: reqbody.csrfToken,
  })

  if (!csrfTokenVerified) return NextResponse.json({ message: "Invalid idToken" }, { status: 403 })


  const user = {
    uid: decodedToken.uid,
    email: decodedToken.email,
    displayName: decodedToken.name,
    photoURL: decodedToken.picture,
    lastLoginAt: serverTimestamp(),
  }
  //유저 정보 저장
  try {
    const userRef = doc(firestore, "users", decodedToken.uid);
    //doc parameter (reference to the document, path, pathSegments)
    await setDoc(
      //setDoc parameter (reference to the document, data to write, SetOptions)
      userRef,
      user,
      { merge: true }
      //SetOptions parameter (merge: boolean, mergeFields: string[])
      //기존 데이터에 덮어쓰거나 없으면 신규 데이터 생성
    )
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
    message: "Login success",
  }

  const res = new NextResponse(JSON.stringify(resbody),{
    status: 200,
    headers: {
      "Content-Type": "application/json",
    }
  })
  res.cookies.set("session", sessionCookie, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: true,
    path: "/",
  });
  res.cookies.set("next-auth.csrf-token", cookieValue, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: true,
})
  return res
}

// //유저 authenticate
// export async function GET(req: NextRequest) {
//   //https://firebase.google.com/docs/auth/admin/manage-cookies#verify_session_cookie_and_check_permissions
//   //case 1 session cookie가 없는 경우
//   const session = cookies().get("session")?.value || "";
//   if (!session) {
//     return NextResponse.json({ isLogged: false }, { status: 401 });
//   }
//   //case 2 session cookie가 있지만, 만료된 경우
//   const decodedClaims = await auth().verifySessionCookie(session, true);
//   //verifySessionCookie(sessionCookie: string, checkRevoked?: boolean): Promise<DecodedIdToken>;
//   if (!decodedClaims) {
//     return NextResponse.json({ isLogged: false }, { status: 401 });
//   }

//   return NextResponse.json({ isLogged: true }, { status: 200 });

// })


