"use client"

import Image from 'next/image'

import Link from 'next/link';
import { SignupButton } from '@/app/components/Buttons';
import { getRedirectResult, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { addUserToFirestore } from '../../../../firebase/userController';
// import { useRouter } from 'next/router'; v13 이전 page directory에서 사용
// app directory에서는
import { useRouter } from 'next/navigation'
import SignupForm from '@/app/components/SignupForm';
import { auth, googleAuthProvider } from '../../../../firebase/firebaseApp';
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
    console.log(result)
    const user = result?.user;
    const operationType = result?.operationType;

    if(user){
      addUserToFirestore(user);
      router.push('/suggest');
    }

  }).catch((error) => {
    console.error(error)

  });


  return (
    <div className="container flex flex-col w-full font-nanumGothic px-9 h-full items-center justify-center gap-8">
      <div className="flex items-center justify-center"><Image src="/images/icon--ipu.png" alt="I PILL U logo" width={40} height={40} /><p className="text-[40px] font-semibold tracking-wide ml-2.5">I Pill U</p></div>
      <SignupForm />
      <div className="flex w-full items-center tracking-wide justify-center text-center text-[--black-300]">계정이 있으신가요?<Link href="/login" className="text-[--blue-100] ml-0.5" >로그인</Link></div>
      <div className="flex flex-col shrink-0 w-full gap-[4px]">
        <SignupButton authProvider='google' onClick={googleSignin}/>
        <SignupButton authProvider='github' />
        <SignupButton authProvider='facebook' />
        <SignupButton authProvider='kakao' />
      </div>
    </div>
  )
}

export default Signup;