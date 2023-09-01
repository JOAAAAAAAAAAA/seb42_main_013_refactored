import Link from 'next/link';

// import { useRouter } from 'next/router'; v13 이전 page directory에서 사용
// app directory에서는
import SignupForm from '@/app/components/SignupForm';
import SignupButtons from '@/app/components/SignupButtons';
import { redirect } from 'next/navigation';
// server 에서 route segments 단위로 code-split
// client 에서는 해당 코드를 prefetch 후 route segments 단위로 caching
// user가 navigate 시 page를 reload 하지 않고 해당 route segments에서 변화한 부분만 re-render

async function Signup() {
  return (
    <div className="flex flex-col px-[20px] justify-around overflow overflow-hidden h-full">
      <SignupForm />
      <div className="flex w-full items-center tracking-wide justify-center text-center text-[--black-300]">계정이 있으신가요?<Link href="/login" className="text-[--blue-100] ml-0.5" >로그인</Link></div>
      <SignupButtons />
    </div>
  )
}

export default Signup;