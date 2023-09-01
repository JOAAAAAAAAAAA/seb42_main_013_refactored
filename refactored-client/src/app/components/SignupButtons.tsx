"use client"
import { SignupButton } from "./SignupButton"
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { handleGoogleSignIn } from "../@unAuthenticated/signup/helper";
import { AuthContext } from "@/context/AuthProvider";
import { getRedirectResult } from "firebase/auth";
import { auth } from "@/firebase/firebaseApp";



export default function SignupButtons() {
  const router = useRouter();
  const { signUp, getRedirectResultFromGoogle, signOut } = useContext(AuthContext);

  useEffect(() => {
    console.log("useEffect")
    getRedirectResult(auth)
      .then((result) => {
        console.log("fdfds", result)
        if (result && result.user) {
          signUp(result.user)
        }
      })
  }, [])

  return (
    <div className="flex flex-col shrink-0 w-full gap-[4px]">
      <SignupButton authProvider='google' onClickHandler={handleGoogleSignIn} />
      <SignupButton authProvider='github' onClickHandler={handleGoogleSignIn} />
      <SignupButton authProvider='facebook' onClickHandler={handleGoogleSignIn} />
      <SignupButton authProvider='kakao' onClickHandler={handleGoogleSignIn} />
    </div>

  )
}
