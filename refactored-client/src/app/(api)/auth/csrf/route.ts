import { getCsrfTokenWithCookie } from '@/lib/csrf'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const csrfToken = await getCsrfTokenWithCookie()
  if (csrfToken) {
    console.log('csrf 생성 완료')
    return NextResponse.json({ 'csrf-token': csrfToken }, { status: 200 })
  }
}
