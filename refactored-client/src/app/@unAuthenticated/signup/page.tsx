"use client"
import Link from 'next/link';
import SignupForm from '@/app/components/SignupForm';
import { SignupButton } from '@/app/components/SignupButton';
import { handleGoogleSignIn } from './helper';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthProvider';



function Signup() {
  const router = useRouter();
  const { getRedirectResultFromGoogle, signInwithGoogle } = useContext(AuthContext);

  useEffect(() => {
    getRedirectResultFromGoogle()
  }, [])

  return (
    <div className="flex flex-col px-[20px] justify-around overflow overflow-hidden h-full">
      <SignupForm />
      <div className="flex w-full items-center tracking-wide justify-center text-center text-[--black-300]">계정이 있으신가요?<Link href="/login" className="text-[--blue-100] ml-0.5" >로그인</Link></div>
      <div className="flex flex-col shrink-0 w-full gap-[4px]">
        <SignupButton authProvider='google' onClickHandler={signInwithGoogle} />
        <SignupButton authProvider='github' onClickHandler={signInwithGoogle} />
        <SignupButton authProvider='facebook' onClickHandler={signInwithGoogle} />
        <SignupButton authProvider='kakao' onClickHandler={signInwithGoogle} />
      </div>
    </div>
  )
}

export default Signup;