"use client"

import { SignupButton } from './SignupButton';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/AuthProvider';



 
export const SignupButtons = ({csrfToken}: {csrfToken: string}) => {
  const { sessionLoginfromRedirect, signInwithGoogle, authUser } = useContext(AuthContext);
  useEffect(() => {
    sessionLoginfromRedirect(csrfToken)
  }, [])
  return (
    //! 변수 사용시 []로 감싸야 함
    <div className="flex w-full shrink-0 flex-col gap-[--gap-sm]">
      <div className="m-[15px_5px_20px] my-[--gap-md] w-full border-b border-[#aaa] text-center text-[13px] leading-[0.1em] text-[#949393]"><span className="bg-white px-[10px]">또는</span></div>
      <SignupButton authProvider='google' onClickHandler={signInwithGoogle} />
      {/* <SignupButton authProvider='github' onClickHandler={signInwithGoogle} />
      <SignupButton authProvider='facebook' onClickHandler={signInwithGoogle} />
      <SignupButton authProvider='kakao' onClickHandler={signInwithGoogle} /> */}
    </div>
  )
}