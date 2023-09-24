import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { Concern } from '@/types'
import { NextRequest, NextResponse } from 'next/server'
import { createCSRFToken } from '../../../../node_modules/@auth/core/lib/csrf-token'

export async function POST(req: NextRequest) {

  //admin 체크
  const session = req.cookies.get('session')?.value || ''
  const decodedClaims = await adminAuth.verifySessionCookie(session, true)
  const { uid } = decodedClaims
  const userRecord = await adminAuth.getUser(uid)
  const isAdmin = userRecord.customClaims?.admin
  if (!isAdmin) {
    return NextResponse.json(
      { message: 'Unauthorized: Access is denied' },
      { status: 401 },
    )
  }
  //csrfToken 검증
  const cookieValue = req.cookies.get('next-auth.csrf-token')?.value
  const isPost = req.method === 'POST'
  const reqbody = await req.json()
  const csrfOptions = {
    secret: process.env.AUTH_SECRET,
  }
  const { csrfTokenVerified } = await createCSRFToken({
    options: csrfOptions,
    cookieValue,
    isPost,
    bodyValue: reqbody.csrfToken,
  })

  //바디 체크
  if (!req.body)
    return NextResponse.json({ message: 'No body' }, { status: 400 })

  const contentType = req.headers.get('content-type')
  const body = async () => {
    if (contentType?.includes('application/json')) {
      return await req.json()
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      const params = new URLSearchParams(await req.text())
      return Object.fromEntries(params)
    }
  }
  const { collection, data } = await body()

  const batch = adminFirestore.batch()
  data.forEach((data: Concern) => {
    const ref = adminFirestore.collection(collection).doc(data.id)
    batch.set(ref, data)
  })
  batch.commit()
  return NextResponse.json({ message: 'success' }, { status: 200 })
}

export async function GET(req: NextRequest) {
  const healthRef = adminFirestore.collection('health')
  const snapshot = await healthRef.get()
  const data = snapshot.docs.map((doc) => doc.data())
  const serializedData = JSON.stringify(data)
  return NextResponse.json(data, { status: 200 })
}
