
import { adminAuth } from "@/firebase/firebaseAdmin";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

  // console.log('logout req', req)
  //! 로그아웃이라 검사할 필요 없을 것 같음
  // const sessionCookie = req.cookies.get('session')?.value
  // if(!sessionCookie) return NextResponse.json({message: "no session cookie"}, {status: 401})

  // const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie)
  // if(!decodedClaims) return NextResponse.json({message: "invalid session cookie"}, {status: 401})

  // const redirectURL = new URL ('/signup', req.url)
  // redirect('/signup')
  // redirect 는 307
  // const res =  NextResponse.redirect(`${process.env.AUTH_URL}/signup`)
  // const res = new NextResponse('',{status: 302, headers: {Location: redirectURL.toString()}})
  const res = NextResponse.redirect(new URL("/login", req.url))
  res.cookies.delete("session")
  res.cookies.delete("next-auth.csrf-token")
  res.cookies.delete("next-auth.callback-url")
  return res
}