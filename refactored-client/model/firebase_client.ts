import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();

//TODO 이건 옛날 방식 같음 env.local ??
const FirebaseConfig = { 
  apiKey: publicRuntimeConfig.apiKey,
  authDomain: publicRuntimeConfig.authDomain,
  projectId: publicRuntimeConfig.projectId,
  //.env 파일에 있는 환경변수를 가져와야 하는데 node.js 와 다르게 한번에 안가져와짐
  // next.config.js 수정해야함 
}


export default class FirebaseClient {
  private static instance: FirebaseClient;
  
  private auth: Auth;

  public constructor() {
    const apps = getApps();
    if(apps.length === 0) {
      console.info("Firebase Client init start");
      // 1. Firebase를 초기화하고 Firebase 앱 객체 생성
      // Initialize Firebase
      initializeApp(FirebaseConfig);
   }
   // 2. Authentication SDK 추가 및 초기화
   // Initialize Firebase Authentication and get a reference to the service
   this.auth = getAuth();
   console.log('firebase auth')
  }

  public static getInstance(): FirebaseClient {
    if (!FirebaseClient.instance) {
      FirebaseClient.instance = new FirebaseClient();
    }
    return FirebaseClient.instance; 
  }

  private get Auth(): Auth {
    return this.auth;
  }

}
