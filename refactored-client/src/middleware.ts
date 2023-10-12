import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createCSRFToken, setCSRFCookie, verifyCSRFToken } from './lib/csrf'
import { cookies } from 'next/headers'
import { set } from 'react-hook-form'
 
export async function middleware(req: NextRequest, ) {

  if(req.method === 'POST'){
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
  }
  

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
  // console.log(cookies())
  const csrfTokenCookie = req.cookies.has('csrf-token')
  if (authPaths.includes(path)) {
    console.log('trigger되고는 있다')
    const res = NextResponse.next()
    // const res = new NextResponse()
    await setCSRFCookie(res)
    console.log('res',res)
    return res
  }

//   if (loginPaths.includes(path) && sessionCookie) {
//     return NextResponse.redirect(new URL("/", request.url))
//   }
  return NextResponse.next()
}
// See "Matching Paths" below to learn more
