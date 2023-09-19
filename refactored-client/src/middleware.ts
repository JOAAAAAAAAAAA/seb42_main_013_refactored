import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
  console.log("middleware")
  
  const session = request.cookies.get("session")?.value;
  if (!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const checkSession = await fetch(`${process.env.AUTH_URL}/auth/sessionlogin`,{
    headers: {
      cookie: `session=${session}`,
    },
  })
  if (checkSession.status === 200) {
    return NextResponse.next()
  }else {
    const checkSessionJson = await checkSession.json()
    const res = NextResponse.redirect(new URL("/login", request.url))
    res.cookies.delete("session")
    return res
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/suggest/:path*',
}