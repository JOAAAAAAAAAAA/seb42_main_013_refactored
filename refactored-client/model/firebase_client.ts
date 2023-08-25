import { getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();

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
      initializeApp(FirebaseConfig);
   }
   this.auth = getAuth();
   console.log('firebase auth')
  }

  public static getInstance(): FirebaseClient {
    if (!FirebaseClient.instance) {
      FirebaseClient.instance = new FirebaseClient();
    }
  }

  private get Auth(): Auth {
    return this.auth;
  }

}
