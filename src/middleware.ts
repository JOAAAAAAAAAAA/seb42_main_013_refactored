import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { setCSRFCookie, verifyCSRFToken } from './lib/csrf'
 
export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const csrfPaths = ["/auth/sessionlogin"]
  if(csrfPaths.includes(path)){
  if(req.method === 'POST'){
    //server action 도 post 로 들어가서;
    const cookieValue = req.cookies.get('csrf-token')?.value || ''
    if (!cookieValue) return NextResponse.json({ message: 'no csrfToken found' }, { status: 401 })
    const bodyValue = (await req.json()).csrfToken
    const csrfTokenVerified = await verifyCSRFToken({
      cookieValue: cookieValue,
      bodyValue: bodyValue,
    })
    if (csrfTokenVerified) {
      return NextResponse.next()
    } else {
      return  NextResponse.json({ message: 'Invalid CSRF Token' }, { status: 403 })
    }
  }}


  if(req.nextUrl.searchParams.get('error')==='session-cookie-expired'){
    const res = NextResponse.next()
    res.cookies.delete('session')
    return res
  }
  const search = req.nextUrl.search //모달 띄우는 경우에는 refresh 안되게
  const authPaths = ["/login", "/signup"]
  if (authPaths.includes(path) && search === '' && req.method === 'GET') {
    // const sessionCookie = req.cookies.get("session")?.value || ''
    // if(sessionCookie) {
    //   return NextResponse.redirect(new URL("/", req.url))
    // }
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
