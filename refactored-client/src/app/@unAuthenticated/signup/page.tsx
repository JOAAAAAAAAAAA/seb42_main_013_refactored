import SignupForm from '@/app/@unAuthenticated/signup/SignupForm';
import { SignupButtons } from '@/app/components/SignupButtons';


async function Signup() {
  return (
    <div className="flex flex-col px-[20px] justify-center overflow overflow-hidden h-full items-center gap-[--gap-lg]">
      <SignupForm />
      <SignupButtons/>
    </div>
  )
}

export default Signup;