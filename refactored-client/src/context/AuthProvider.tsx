"use client"
import { AuthUser, PillData, SignUpData, LoginData } from "@/types";
import { createUserWithEmailAndPassword, getRedirectResult, inMemoryPersistence, sendEmailVerification, setPersistence, signInWithEmailAndPassword, signInWithRedirect, updateProfile } from "firebase/auth";
import React, { createContext, use, useReducer } from "react";
import { auth, googleAuthProvider } from "../firebase/firebaseApp";
import { useRouter } from "next/navigation";
import Loading from "@/context/loading";
import { getSessionCookie } from "./helper";
import { Timestamp } from "firebase/firestore/lite";



//context 에는 전달할 값만 loading 필요없음
type AuthContextType = {
  signInwithGoogle: () => void;
  signUpwithEmail: (data: SignUpData) => void;
  signInwithEmail: (data: LoginData) => void;
  sessionLoginfromRedirect: () => Promise<void>;
  authUser: AuthUser | null;
}

const initialState: AuthContextType = {
  signInwithGoogle: () => { },
  signUpwithEmail: () => { },
  sessionLoginfromRedirect: () => Promise.resolve(),
  signInwithEmail: () => { },
  authUser: null,
}

export const AuthContext = createContext<AuthContextType>(initialState);

//reducer 에는 상태
type AuthAction =
  | { type: "login"; authUser: AuthUser; }
  | { type: "setLoading"; isLoading: boolean }
  | { type: "getPills"; pills: PillData[] }


type AuthState = {
  authUser: AuthUser | null;
  pills: PillData[] | null;
  isLoading: boolean;
}


const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "login":
      return { ...state, authUser: action.authUser };
    case "setLoading":
      return { ...state, isLoading: action.isLoading };
    case 'getPills':
      return { ...state, pills: action.pills };
    default:
      return state;
  }
};



export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [state, dispatch] = useReducer(authReducer, {
    authUser: null,
    isLoading: false,
    pills: null,
  });

  //provider 에 전달할 값 빼기
  const { authUser, pills } = state

  //!1. 구글로 로그인&시작하기 onClickHandler
  const signInwithGoogle = () => {
    dispatch({ type: "setLoading", isLoading: true })
    signInWithRedirect(auth, googleAuthProvider)
  }
  //!2. signInWithRedirect는 리턴값이 없음 getRedirectResult로 받아야함
  //아니면 그냥 firebase.auth().currentUser.getIdToken()으로 받아도 될 것 같음


  const sessionLoginfromRedirect = async (csrfToken:string) => {
    dispatch({ type: "setLoading", isLoading: true })
    try {
      const userCredential = await getRedirectResult(auth)
      console.log('실행중')
      console.log('token exists', csrfToken)
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
        const idToken = await userCredential._tokenResponse?.idToken
        // const user = {
        //   uid: userCredential.user.uid,
        //   email: userCredential.user.email,
        //   displayName: userCredential.user.displayName,
        //   photoURL: userCredential.user.photoURL,
        //   lastLoginAt: userCredential.user.metadata.lastSignInTime,
        // }
        
        // const [idToken, csrfToken] = await Promise.all([
        //   userCredential.user.getIdToken(),
        //   fetch("/auth/csrf"),
        // ]);

        //https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html#double-submit-cookie
        //csrfToken은 session단위로 생성되어야 한다. no timestamps
        // const body = await csrfToken.json()
        
        const response = await getSessionCookie(idToken, csrfToken)
        if (response.status === 200) {
          // window.location.href = "/"
          const res = await response.json()
          dispatch({ type: "login", authUser: res.user })
          //!세션쿠키를 사용해여 사용자 세션을 관리하므로, 클라이언트에서는 상태를 유지하지 않는다.
          setPersistence(auth, inMemoryPersistence)
          auth.signOut()
          router.push("/")
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      dispatch({ type: "setLoading", isLoading: false })
    }
  }
  const signUpwithEmail = async (data: SignUpData) => {
    dispatch({ type: "setLoading", isLoading: true })
    const { email, password, displayName } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential && auth.currentUser) {
        sendEmailVerification(auth.currentUser)
        updateProfile(auth.currentUser, {
          displayName: displayName,
          photoURL: `https://source.boringavatars.com/beam/${userCredential.user.uid}`
        })
        router.push("/signup?success=true")
      }
    } catch (error) {
      error.code === "auth/email-already-in-use" && router.push("/signup?error=email-already-in-use")
      console.log(error)
    } finally {
      dispatch({ type: "setLoading", isLoading: false })
    }  
  }

  const signInwithEmail = async (data: LoginData) => {
    const { email, password, csrfToken } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if(!userCredential.user.emailVerified){
        router.push("/login?error=email-not-verified")
      }
      if (userCredential && auth.currentUser) {
        const idToken = await userCredential._tokenResponse?.idToken
        const response = await getSessionCookie(idToken, csrfToken)
        if (response.status === 200) {
          const res = await response.json()
          dispatch({ type: "login", authUser: res.user })
          setPersistence(auth, inMemoryPersistence)
          auth.signOut()
          router.push("/")
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      dispatch({ type: "setLoading", isLoading: false })
    }  
  }
  




  return (
    <AuthContext.Provider value={{ authUser, signInwithGoogle, sessionLoginfromRedirect, signUpwithEmail, signInwithEmail }}>
      {state.isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}


//TODO auth.currentUser해도 layout 에 반영이 안됨 -> context로 해결해보기
//https://stackoverflow.com/questions/74311376/using-react-context-with-nextjs13-server-side-components
//ㅠㅠ 함수 다 짰는데 쓸모가 없어짐