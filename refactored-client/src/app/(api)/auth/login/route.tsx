import { NextRequest, NextResponse } from "next/server";
import { doc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { firestore } from "@/firebase/firebaseApp";
import { cookies, headers } from "next/headers";
import { auth } from "firebase-admin";
import { adminAuth, firebaseAdmin } from "@/firebase/firebaseAdmin";
import { AuthUser, decodedUser } from "@/types";




export async function POST(req: NextRequest) {
  const authorization = headers().get("Authorization");
  //https://firebase.google.com/docs/auth/admin/verify-id-tokens
  //https://firebase.google.com/docs/auth/admin/verify-id-tokens#web
  //https://firebase.google.com/docs/reference/admin/node/firebase-admin.auth.baseauth.md#baseauthverifyidtoken
  //verifyIdToken(idToken: string, checkRevoked?: boolean): Promise<DecodedIdToken>;
  //을 활용해서 idToken을 검증하고, 검증이 완료되면 session cookie를 생성한다.
  if (authorization) {
    const idToken = authorization.split("Bearer ")[1];

    //이렇게만 작성하면 admin app이 실행이 안됨
    // const decodedToken = await auth().verifyIdToken(idToken);
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (decodedToken) {
      //유저 정보 저장
      try {
        const userRef = doc(firestore, "users", decodedToken.uid);
        //doc parameter (reference to the document, path, pathSegments)
        await setDoc(
          //setDoc parameter (reference to the document, data to write, SetOptions)
          userRef,
          {
            uid: decodedToken.uid,
            email: decodedToken.email,
            displayName: decodedToken.name,
            photoURL: decodedToken.picture,
            lastLoginAt: serverTimestamp(),
          },
          { merge: true }
          //SetOptions parameter (merge: boolean, mergeFields: string[])
          //perform granular merges instead of overwriting the target documents in their entirety by providing a SetOptions with merge: true.
        )
      } catch (error) {
        console.error(error)
        return NextResponse.json({ message: "add user incomplete" }, { status: 500 })
      }
      //세션쿠키 생성
      const expiresIn = 1000 * 60 * 60 * 24 * 5; //1day
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });
      const options = {
        name: "session",
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      //브라우저에 쿠키 저장
      cookies().set(options);
      return NextResponse.json({ message: "login success" }, { status: 200 })
    } else {
      return NextResponse.json({ message: "no user found" }, { status: 404 })
    }
  }
}

//유저 authenticate
export async function GET(req: NextRequest) {
  //https://firebase.google.com/docs/auth/admin/manage-cookies#verify_session_cookie_and_check_permissions
  //case 1 session cookie가 없는 경우
  const session = cookies().get("session")?.value || "";
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }
  //case 2 session cookie가 있지만, 만료된 경우
  const decodedClaims = await auth().verifySessionCookie(session, true);
  //verifySessionCookie(sessionCookie: string, checkRevoked?: boolean): Promise<DecodedIdToken>;
  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });

}
