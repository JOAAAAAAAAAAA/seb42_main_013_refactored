import { concern } from '@/data';
import { adminAuth, adminFirestore } from '@/firebase/firebaseAdmin'
import { NextResponse,NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  // console.log('health!!!!!!!!!')
  // adminAuth.setCustomUserClaims('pcgFtmwW1qglolelmFLu8EuG44L2', { admin: true })
  // adminAuth.getUser('pcgFtmwW1qglolelmFLu8EuG44L2')
  // .then((userRecord) => {
  //   console.log('userRecord',userRecord)
  // })

  // const session = req.cookies.get("session")?.value || '';
  // const decodedClaims = await adminAuth.verifySessionCookie(session, true);
  // console.log('health',decodedClaims)
  // return NextResponse.next()

//  const batch = adminFirestore.batch()
//  const healthRef = adminFirestore.collection('healthConcerns').doc('health')
//   concern.forEach((concern,idx) => {
//   const ref = adminFirestore.collection('healthConcerns').doc(concern.iconURL.slice(13,-4))
//   batch.set(ref,{
//     ...concern,
//     id: idx
//   })
// })
// batch.commit()
}