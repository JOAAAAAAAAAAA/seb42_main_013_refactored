"use client"
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { SignupButton } from "./SignupButton"
import { auth, googleAuthProvider } from "../../../firebase/firebaseApp";

export default function SignupButtons() {

  const googleSignin = () => {
    signInWithPopup(auth, googleAuthProvider);
  } 
  //! ssr page 내에서 client component내에 auth을 사용하면
  //! index-9a76d29a.js:9750 Cross-Origin-Opener-Policy policy would block the window.close call.
  //! 라는 메세지와 함께 작동아 안된다.
  //! 터미널에는 firebase 가 해당 환경에서 작동될 수 없다는 메세지가 뜬다.


  return (
    <div className="flex flex-col shrink-0 w-full gap-[4px]">
    <SignupButton authProvider='google' onClickHandler={googleSignin}/>
    <SignupButton authProvider='github' />
    <SignupButton authProvider='facebook' />
    <SignupButton authProvider='kakao' />
  </div>
  )
}
