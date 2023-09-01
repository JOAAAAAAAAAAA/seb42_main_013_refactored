"use client"
import { SignupButton } from "./SignupButton"
import { getRedirectResultFromGoogle, handleGoogleSignIn } from "../@login/signup/helper";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SignupButtons() {
  const router = useRouter();
  useEffect(() => {
    getRedirectResultFromGoogle(router)
  }, [])

  return (
    <div className="flex flex-col shrink-0 w-full gap-[4px]">
    <SignupButton authProvider='google' onClickHandler={handleGoogleSignIn}/>
    <SignupButton authProvider='github' onClickHandler={handleGoogleSignIn}/>
    <SignupButton authProvider='facebook' onClickHandler={handleGoogleSignIn}/>
    <SignupButton authProvider='kakao' onClickHandler={handleGoogleSignIn} />
  </div>
  )
}
