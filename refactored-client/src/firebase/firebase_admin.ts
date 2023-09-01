import * as admin from "firebase-admin";

interface Config {
  credential: {
    projectId: string;
    clientEmail: string;
    privateKey: string;
  };
}

export default class FirebaseAdmin {
  public static instance: FirebaseAdmin;
  private init = false;

  public static getInstance(): FirebaseAdmin {
    if (!FirebaseAdmin.instance) {
      //초기화 진행
      FirebaseAdmin.instance = new FirebaseAdmin();
      //TODO: 환경을 초기화
      FirebaseAdmin.instance.bootstrap();
    }
    return FirebaseAdmin.instance;
  }

  /** 환경 초기화 메서드 */
  private bootstrap(): void {
    const haveApp = admin.apps.length !== 0;
    if (haveApp) {
      this.init = true;
      return; // 로직 진행 중지
    }
    //초기화
    const config: Config = {
      credential: {
        projectId: process.env.projectId || "", // 환경변수에서 가져옴 || 없으면 빈 문자열
        clientEmail: process.env.clientEmail || "",
        privateKey: (process.env.privateKey || "").replace(/\\n/g, "\n"), // 개행문자 치환
      },
    };
    //initializeApp 메서드를 통해 초기화
    admin.initializeApp({ credential: admin.credential.cert(config.credential) });
    console.info("Firebase Admin SDK initialized");
  }
  /** firesotre 을 반환 */
  public get Firebase(): FirebaseFirestore.Firestore {
    if (!this.init) {
      this.bootstrap();
      // throw new Error("Firebase Admin SDK not initialized");
    }
    return admin.firestore();
  }

  public get Auth(): admin.auth.Auth {
    if (!this.init) {
      this.bootstrap();
      // throw new Error("Firebase Admin SDK not initialized");
    }
    return admin.auth();
  }
}
