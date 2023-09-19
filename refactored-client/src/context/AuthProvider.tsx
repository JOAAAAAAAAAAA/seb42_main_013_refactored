"use client"
import { AuthUser } from "@/types";
import { User, browserLocalPersistence, getRedirectResult, inMemoryPersistence, onAuthStateChanged, setPersistence, signInWithRedirect } from "firebase/auth";
import React, { createContext, use, useEffect, useReducer, useState } from "react";
import { app, auth, googleAuthProvider } from "../firebase/firebaseApp";
import { addUserToFirestore } from "../firebase/userController";
import { useRouter } from "next/navigation";


//context 엔 전달할 값만 loading 필요없음
type AuthContextType = {
  isLoggedIn: boolean;
  authUser: AuthUser | null;
  signUp: (user: User) => void;
  signInwithGoogle: () => void;
  sessionLogin: () => Promise<void>;
  sessionLogout: () => Promise<void>;

}


const initialState: AuthContextType = {
  isLoggedIn: false,
  authUser: null,
  signUp: (user: User) => { },
  signInwithGoogle: () => { },
  sessionLogin: () => Promise.resolve(),
  sessionLogout: () => Promise.resolve(),
}

export const AuthContext = createContext<AuthContextType>(initialState);

//reducer 엔 상태
type AuthAction =
  | { type: "login"; authUser: AuthUser; isLoggedIn: boolean }
  | { type: "logout" }
  | { type: "setLoading"; isLoading: boolean }
  | { type: "updateUser"; authUser: AuthUser }

type AuthState = {
  isLoggedIn: boolean;
  authUser: AuthUser | null;
  isLoading: boolean;
}


const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "login":
      return { ...state, isLoggedIn: action.isLoggedIn, authUser: action.authUser };
    case "logout":
      return { ...state, isLoggedIn: false, authUser: null };
    case "setLoading":
      return { ...state, isLoading: action.isLoading };
    case "updateUser":
      return { ...state, authUser: action.authUser }
    default:
      return state;
  }
};



export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {


  const [state, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    authUser: null,
    isLoading: true,
  });
  //provider 엔 전달할 값 빼기
  const { isLoggedIn, authUser } = state
  const router = useRouter()

  //!1. 구글로 로그인&시작하기 onClickHandler
  const signInwithGoogle = () => {
    signInWithRedirect(auth, googleAuthProvider)
  }
  //!2. signInWithRedirect는 리턴값이 없음 getRedirectResult로 받아야함
  //아니면 그냥 firebase.auth().currentUser.getIdToken()으로 받아도 될 것 같음
  const sessionLogin = async () => {
    try {
      const userCredential = await getRedirectResult(auth)
      console.log('userCredential', userCredential)
      // result 는 UserCredential or null
      // firebase 는 authrization code나 Access Token 를 반환하지 않고 firebase의 idToken과 Refresh를 반환한다.
      // idToken 수명은 1시간으로 매우 짧다.
      // nextjs의 server-side web application 구현을 위해 서버에서 유저의 인증 상태를 관리해야한다.
      // firebase admin 은 사용자의 Refresh Token을 revoke 할 수 있으므로 유저의 세션을 컨트롤 할 수 있다.
      // https://firebase.google.com/docs/auth/admin/manage-sessions?hl=en
      // session cookie를 사용하자
      if (userCredential) {
        //!3. 먼저 검증을 위해 idToken을 서버로 보내자.
        const idToken = await userCredential.user.getIdToken();
        //!4. csrf      
        //https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie
        //csrfToken은 session단위로 생성되어야 한다. no timestamps
        const headers = new Headers({
          "Authorization": `Bearer ${idToken}`,
          "Content-Type": "application/json",
        })

        const csrfToken = await fetch("/api/auth/csrf")
        const body = await csrfToken.json()
        const response = await fetch("/auth/sessionlogin", {
          method: "POST",
          headers,
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const res = await response.json()
          dispatch({ type: "login", authUser: res.user, isLoggedIn: true })
          //!세션쿠키를 사용해여 사용자 세션을 관리하므로, 클라이언트에서는 상태를 유지하지 않는다.
          setPersistence(auth, inMemoryPersistence)
          auth.signOut()    
          window.location.href = "/"
        }
      }else{
        console.log("no userCredential")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const sessionLogout = async () => {
    const res = await fetch(`/auth/sessionlogout`, {
      method: 'POST',
    })
    if (res.ok) {
      window.location.href = "/"
    }
    dispatch({ type: "logout" })
  }

  const signUp = (user: User) => {
    // addUserToFirestore(user)
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "updateUser", authUser: user })
      } else {
        // dispatch({ type: "signOut" });
        // router.push("/login")
      }
      dispatch({ type: "setLoading", isLoading: false });
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, authUser, signUp, signInwithGoogle, sessionLogin, sessionLogout }}>
      {state.isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )


}


//context 사용하면 server side rendering이 안됨
//보류
//TODO auth.currentUser해도 layout 에 반영이 안됨 -> context로 해결해보기
//https://stackoverflow.com/questions/74311376/using-react-context-with-nextjs13-server-side-components
//ㅠㅠ 함수 다 짰는데 쓸모가 없어짐