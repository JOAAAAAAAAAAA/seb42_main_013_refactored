

import { SignupButtons } from '../components/SignupButtons';
import SignupForm from './SignupForm';


async function Signup() {
  return (
    <div className="container flex h-full flex-col items-center justify-center gap-[--gap-lg] overflow-hidden px-[20px]">
      <SignupForm />
      <SignupButtons />
    </div>
  )
}

export default Signup;