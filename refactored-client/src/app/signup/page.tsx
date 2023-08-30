"use client"

import Image from 'next/image'
import SignupForm from '../components/SignupForm';
import Link from 'next/link';
import { SignupButton } from '../components/Buttons';
import { auth, googleAuthProvider } from '../../../firebase/firebaseApp';
import { getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { addUserToFirestore } from '../../../firebase/userController';
// import { useRouter } from 'next/router'; v13 이전 page directory에서 사용
// app directory에서는
import { useRouter } from 'next/navigation'
// server 에서 route segments 단위로 code-split
// client 에서는 해당 코드를 prefetch 후 route segments 단위로 caching
// user가 navigate 시 page를 reload 하지 않고 해당 route segments에서 변화한 부분만 re-render

function Signup() {
  const router = useRouter();

  const googleSignin = () => {
    signInWithRedirect(auth, googleAuthProvider);
  } 
  
  getRedirectResult(auth)
  .then((result) => {
    console.log("triggered")
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result?.user;
    const operationType = result?.operationType;
    console.log(user, operationType)
    user && addUserToFirestore(user);
    router.push('/suggest');
  }).catch((error) => {
    console.error(error)
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = googleAuthProvider.credentialFromError(error);
    // ...
  });


  return (
    <div className="container flex flex-col w-full font-nanumGothic px-9 h-full items-center justify-center gap-8">
      <div className="flex items-center justify-center"><Image src="/images/icon--ipu.png" alt="I PILL U logo" width={40} height={40} /><p className="text-[40px] font-semibold tracking-wide ml-2.5">I Pill U</p></div>
      <SignupForm />
      <div className="flex w-full items-center tracking-wide justify-center text-center text-[--black-300]">계정이 있으신가요?<Link href="/login" className="text-[--blue-100] ml-0.5" >로그인</Link></div>
      <div className="flex flex-col shrink-0 w-full gap-[4px]">
        <SignupButton oauthProvider='google' onClick={googleSignin}/>
        <SignupButton oauthProvider='github' />
        <SignupButton oauthProvider='facebook' />
        <SignupButton oauthProvider='kakao' />
      </div>
    </div>
  )
}

export default Signup;