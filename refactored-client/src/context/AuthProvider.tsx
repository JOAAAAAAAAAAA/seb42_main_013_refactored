"use client"
import { AuthUser } from "@/types";
import { User, getRedirectResult, onAuthStateChanged, signInWithRedirect } from "firebase/auth";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase/firebaseApp";
import { addUserToFirestore } from "../firebase/userController";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';


//context 엔 전달할 값만 loading 필요없음
type AuthContextType = {
  isLoggedIn: boolean;
  authUser: AuthUser | null;
  // signInWithGoogle: () => void;
  getRedirectResultFromGoogle: (router: AppRouterInstance) => Promise<void>;
  signUp: (user: User) => void;
  signOut: () => void;
}


const initialState: AuthContextType = {
  isLoggedIn: false,
  authUser: null,
  getRedirectResultFromGoogle: (router: AppRouterInstance) => Promise.resolve(),
  signUp: (user: User) => { },
  signOut: () => { },
}

export const AuthContext = createContext<AuthContextType>(initialState);

//reducer 엔 상태
type AuthAction =
  | { type: "signin"; authUser: AuthUser; isLoggedIn: boolean }
  | { type: "signOut" }
  | { type: "setLoading"; isLoading: boolean }
  | { type: "updateUser"; authUser: AuthUser }

type AuthState = {
  isLoggedIn: boolean;
  authUser: AuthUser | null;
  isLoading: boolean;
}


const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case "signin":
      return { ...state, isLoggedIn: action.isLoggedIn, authUser: action.authUser };
    case "signOut":
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
  //provider 엔 전달할 값
  const { isLoggedIn, authUser } = state

  const getRedirectResultFromGoogle = async (router: AppRouterInstance) => {
    try {
      const result = await getRedirectResult(auth)
      if (result && result.user) {
        const authUser = result.user
        addUserToFirestore(result.user)
        const isLoggedIn = !!auth.currentUser
        dispatch({ type: "signin", authUser, isLoggedIn })
        router.push("/")
      }
    } catch (error) {
      console.error(error);
    }
  }
  const signOut = () => {
    auth.signOut()
    dispatch({ type: "signOut" })
  }
  const signUp = (user: User) => {
    addUserToFirestore(user)
    dispatch({ type: "signin", authUser: user, isLoggedIn: true })
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: "updateUser", authUser: user })
      } else {
        dispatch({ type: "signOut" });
      }
      dispatch({ type: "setLoading", isLoading: false });
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, authUser, signUp, getRedirectResultFromGoogle, signOut }}>
      {state.isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  )


}


//context 사용하면 server side rendering이 안됨
//보류
//TODO auth.currentUser해도 layout 에 반영이 안됨 -> context로 해결해보기
//https://stackoverflow.com/questions/74311376/using-react-context-with-nextjs13-server-side-components
//ㅠㅠ 함수 다 짰는데 쓸모가 없어짐