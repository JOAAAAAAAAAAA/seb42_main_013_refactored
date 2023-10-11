import { SignupButtons } from "@/app/components/SignupButtons";
import LoginForm from "./LoginForm";
import { useParams, useSearchParams } from "next/navigation";
import SessionExpireModal from "../components/ErrorModal";


function Login() {


  return (

    <div className="flex h-full flex-col items-center justify-center gap-[--gap-lg] overflow-hidden px-[20px]">
      <div className="ml-[10px] text-[40px]">Welcome!</div>
      <LoginForm />
      <SignupButtons />
    </div>
  )
}

export default Login