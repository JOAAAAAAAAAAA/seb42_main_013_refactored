import { createCSRFToken} from '@/lib/csrf'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const {cookieValue, csrfToken}= await createCSRFToken()
  const res = new NextResponse(JSON.stringify({'csrfToken': csrfToken }), { status: 200 })
  res.cookies.set('csrf-token', cookieValue, {
    path: '/',
    secure: true,
    sameSite: 'lax',
    httpOnly: true,
    maxAge: 60* 60 * 24, // 1 day 
  })
  return res
}


// const {cookieValue, csrfToken}= await createCSRFToken()
// const res = new NextResponse(JSON.stringify({'csrfToken': csrfToken }), {
//   status: 200,
//   headers: { 'Content-Type': 'application/json' },
// })
// res.cookies.set('csrf-token', cookieValue, {
//   path: '/',
//   secure: true,
//   sameSite: 'lax',
//   httpOnly: true,
//   maxAge: 60 * 60 * 24, // 1 day 
// })
// return res