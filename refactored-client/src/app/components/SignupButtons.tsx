"use client"

import { SignupButton } from '@/app/components/SignupButton';

import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthProvider';




export const SignupButtons = () => {
  const { sessionLogin, signInwithGoogle } = useContext(AuthContext);

  useEffect(() => {
    sessionLogin()
  }, [])


  return (
    //! 변수 사용시 []로 감싸야 함
    <div className="flex flex-col shrink-0 w-full gap-[4px]">
      <div className="w-full text-center border-b border-[#aaa] leading-[0.1em] m-[15px 5px 20px] text-[13px] text-[#949393] my-[--gap-md]"><span className="bg-white px-[10px]">또는</span></div>
      <SignupButton authProvider='google' onClickHandler={signInwithGoogle} />
      <SignupButton authProvider='github' onClickHandler={signInwithGoogle} />
      <SignupButton authProvider='facebook' onClickHandler={signInwithGoogle} />
      <SignupButton authProvider='kakao' onClickHandler={signInwithGoogle} />
    </div>
  )
}