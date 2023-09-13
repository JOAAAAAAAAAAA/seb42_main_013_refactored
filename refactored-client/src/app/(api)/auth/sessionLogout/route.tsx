
import { adminAuth } from "@/firebase/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

  const sessionCookie = req.cookies.get('session')?.value
  if(!sessionCookie) return NextResponse.json({message: "no session cookie"}, {status: 401})

  const decodedClaims = await adminAuth.verifySessionCookie(sessionCookie)
  if(!decodedClaims) return NextResponse.json({message: "invalid session cookie"}, {status: 401})
  
  const res =  NextResponse.json({message: "logout success"}, {status: 200, headers: {
    "Location": "/",
  }})
  res.cookies.delete("session")
  res.cookies.delete("next-auth.csrf-token")
  return res
}