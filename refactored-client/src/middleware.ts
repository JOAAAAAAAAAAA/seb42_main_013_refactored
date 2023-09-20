import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  // console.log("middleware action!!!!!!!!!!!!!!!!!!")

  const sessionCookie = request.cookies.get("session")?.value;
  const path = request.nextUrl.pathname
  
  const protectedPaths = ["/summary", "/suggest"]
  if (protectedPaths.includes(path)) {
    if(!sessionCookie){
      console.log('Protected 세션 쿠키 없음')
      return NextResponse.redirect(new URL("/", request.url))
    }else{
    console.log('세션 쿠키 체크')
    const checkSession = await fetch(`${process.env.AUTH_URL}/auth/sessionlogin`,{
      headers: {
        cookie: `session=${sessionCookie}`,
      }})
      
    if (checkSession.status === 200) {
      console.log('세션 쿠키 유효')
      return NextResponse.next()
    } else {
      console.log('세션 쿠키 만료')
      const res = NextResponse.redirect(new URL("/login", request.url))
      res.cookies.delete("session")
      return res
    }
  }
}

  const loginPaths = ["/login", "/signup"]
  if (loginPaths.includes(path) && sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url))
  }

}
// See "Matching Paths" below to learn more
