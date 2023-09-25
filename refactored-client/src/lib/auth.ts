import { AuthUser } from "@/types";
import { User, getRedirectResult, inMemoryPersistence, onAuthStateChanged, setPersistence, signInWithRedirect } from "firebase/auth";
import React, { createContext, use, useEffect, useReducer, useState } from "react";
import { app, auth, googleAuthProvider } from "../firebase/firebaseApp";
import { addUserToFirestore } from "../firebase/userController";
import { useRouter } from "next/navigation";
import {initializeAuth, browserLocalPersistence, browserPopupRedirectResolver, browserSessionPersistence, indexedDBLocalPersistence} from "firebase/auth";
import { revalidatePath } from "next/cache";
import Loading from "@/app/loading";


export const signInwithGoogle = () => {
  signInWithRedirect(auth, googleAuthProvider)
}

export const sessionLogin = async () => {
    try {
    const userCredential = await getRedirectResult(auth)
    // result 는 UserCredential or null
    // firebase 는 authrization code나 Access Token 를 반환하지 않고 firebase의 idToken과 Refresh를 반환한다.
    // idToken 수명은 1시간으로 매우 짧다.
    // nextjs의 server-side web application 구현을 위해 서버에서 유저의 인증 상태를 관리해야한다.
    // firebase admin 은 사용자의 Refresh Token을 revoke 할 수 있으므로 유저의 세션을 컨트롤 할 수 있다.
    // https://firebase.google.com/docs/auth/admin/manage-sessions?hl=en
    // session cookie를 사용하자
    if (userCredential) {
      //!3. 먼저 검증을 위해 idToken을 서버로 보내자.
      //!4. csrf      
      //! 병렬처리

      const [idToken, csrfToken] = await Promise.all([
        userCredential.user.getIdToken(),
        fetch("/api/auth/csrf"),
      ]);
      //https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie
      //csrfToken은 session단위로 생성되어야 한다. no timestamps
      const headers = new Headers({
        "Authorization": `Bearer ${idToken}`,
        "Content-Type": "application/json",
      })
      const body = await csrfToken.json()
      const response = await fetch("/auth/sessionlogin", {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      if (response.status === 200) {
        // window.location.href = "/"
        const res = await response.json()
        //!세션쿠키를 사용해여 사용자 세션을 관리하므로, 클라이언트에서는 상태를 유지하지 않는다.
        setPersistence(auth, inMemoryPersistence)
        auth.signOut()   
        router.push("/")
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const sessionLogout = async () => {
  const res = await fetch(`/auth/sessionlogout`, {
    method: 'POST',
  })
  if (res.ok) {
    // revalidatePath('/')
    router.push("/login")
  }
}
