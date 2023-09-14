import { SignupButtons } from "@/app/components/SignupButtons";
import LoginForm from "./LoginForm";


function Login() {



  return (

    <div className="flex flex-col px-[20px] justify-center overflow overflow-hidden h-full items-center gap-[--gap-lg]">
      <div className="text-[40px] ml-[10px]">Welcome!</div>
      <LoginForm />
      <SignupButtons />

    </div>
  )
}

export default Login