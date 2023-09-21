import { adminAuth } from '@/firebase/firebaseAdmin'
import { NextResponse,NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('health!!!!!!!!!')
  adminAuth.setCustomUserClaims('pcgFtmwW1qglolelmFLu8EuG44L2', { admin: true })
  adminAuth.getUser('pcgFtmwW1qglolelmFLu8EuG44L2')
  .then((userRecord) => {
    console.log('userRecord',userRecord)
  })

  const session = req.cookies.get("session")?.value || '';
  const decodedClaims = await adminAuth.verifySessionCookie(session, true);
  console.log('health',decodedClaims)
  return NextResponse.next()
}
