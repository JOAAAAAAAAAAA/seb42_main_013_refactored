import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createCSRFToken, setCSRFCookie, verifyCSRFToken } from './lib/csrf'
import { cookies } from 'next/headers'
import { set } from 'react-hook-form'
 
export async function middleware(req: NextRequest, ) {
  
  const protectedPaths = ["/login", "/signup","create","/summary"]
  if(protectedPaths.includes(req.nextUrl.pathname)){
  if(req.method === 'POST'){
    //server action 도 post 로 들어가서;
    console.log('CSRF Verifying...')
    const cookieValue = req.cookies.get('csrf-token')?.value || ''

    if (!cookieValue) return NextResponse.json({ message: 'no csrfToken found' }, { status: 401 })
    const bodyValue = (await req.json()).csrfToken
    const csrfTokenVerified = await verifyCSRFToken({
      cookieValue: cookieValue,
      bodyValue: bodyValue,
    })
    console.log('csrfTokenVerified',csrfTokenVerified)
    if (csrfTokenVerified) {
      return NextResponse.next()
    } else {
      return  NextResponse.json({ message: 'Invalid CSRF Token' }, { status: 403 })
    }
  }}
  

  // console.log("middleware action!!!!!!!!!!!!!!!!!!")

//   const sessionCookie = request.cookies.get("session")?.value;
  const path = req.nextUrl.pathname
  
//   const protectedPaths = ["/summary", "/suggest"]
//   if (protectedPaths.includes(path)) {
//     if(!sessionCookie){
//       console.log('Protected 세션 쿠키 없음')
//       return NextResponse.redirect(new URL("/", request.url))
//     }else{
//     console.log('세션 쿠키 체크')
//     const checkSession = await fetch(`${process.env.AUTH_URL}/auth/sessionlogin`,{
//       headers: {
//         cookie: `session=${sessionCookie}`,
//       }})
      
//     if (checkSession.status === 200) {
//       console.log('세션 쿠키 유효')
//       return NextResponse.next()
//     } else {
//       console.log('세션 쿠키 만료')
//       const res = NextResponse.redirect(new URL("/login", request.url))
//       res.cookies.delete("session")
//       return res
//     }
//   }
// }

  const authPaths = ["/login", "/signup"]
  if (authPaths.includes(path)) {
    const res = NextResponse.next()
    await setCSRFCookie(res)
    return res
  }

//   if (loginPaths.includes(path) && sessionCookie) {
//     return NextResponse.redirect(new URL("/", request.url))
//   }
  return NextResponse.next()
}
// See "Matching Paths" below to learn more
