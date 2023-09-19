import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';


interface firebaseAdminConfig {
  credential: {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  };
}

  const firebaseAdminConfig: firebaseAdminConfig = {
    credential: {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "", // 환경변수에서 가져옴 || 없으면 빈 문자열
      clientEmail: process.env.clientEmail || "",
      privateKey: (process.env.privateKey || "").replace(/\\n/g, "\n"), // 개행문자 치환
    },
  };


const firebaseAdmin = getApps().length ? getApps()[0] : initializeApp({ credential: cert(firebaseAdminConfig.credential) });
const adminAuth = getAuth(firebaseAdmin);
const adminFirestore = getFirestore();

export { firebaseAdmin, adminAuth, adminFirestore };
