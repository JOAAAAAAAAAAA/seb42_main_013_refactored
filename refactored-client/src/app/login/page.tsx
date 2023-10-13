import AlertModal from "../components/AlertModal";
import LoginForm from "./LoginForm";
import { SignupButtons } from "../signup/conponents/SignupButtons";
import { headers } from "next/headers";
import { createCSRFToken } from "@/lib/csrf";
import { Button } from "@mui/material";


async function Login({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {

  const isError = searchParams?.error
  const csrfToken = headers().get("X-CSRF-Token") || ''
  //https://github.com/vercel/next.js/discussions/49843
  //https://nextjs.org/docs/app#how-can-i-set-cookies
  //https://github.com/vercel/next.js/issues/52799#issuecomment-1642035226
  // cannot set cookies from a page or layout directly.
  //!해결방안
  //https://nextjs.org/docs/app/building-your-application/routing/middleware#using-cookies
  //middleware에서 처리


  return (
    <div className="flex h-full flex-col items-center justify-center gap-[--gap-lg] overflow-hidden px-[20px]">
      <div className="ml-[10px] text-[40px]">Welcome!</div>
      <LoginForm csrfToken={csrfToken} />
      <SignupButtons csrfToken={csrfToken}/>
      {isError === "email-not-verified" && <AlertModal msg="이메일 인증을 완료되지 않았습니다." severity="error" />}
      {isError === "session-cookie-expired" && <AlertModal msg={<>세션이 만료되었습니다. <br/> 다시 로그인해주세요.</>} severity="error" />}
    </div>
  )
}

export default Login