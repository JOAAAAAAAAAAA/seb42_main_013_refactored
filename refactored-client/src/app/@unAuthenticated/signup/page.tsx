import Link from 'next/link';
import SignupForm from '@/app/components/SignupForm';
import { SignupButtons } from '@/app/components/SignupButtons';





async function Signup() {
  



  return (
    <div className="flex flex-col px-[20px] justify-around overflow overflow-hidden h-full">
      <SignupForm />
      <div className="flex w-full items-center tracking-wide justify-center text-center text-[--black-300]">계정이 있으신가요?<Link href="/login" className="text-[--blue-100] ml-0.5" >로그인</Link></div>
      <SignupButtons/>
    </div>
  )
}

export default Signup;