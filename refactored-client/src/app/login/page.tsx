import AlertModal from "../components/AlertModal";
import LoginForm from "./LoginForm";
import { SignupButtons } from "../signup/conponents/SignupButtons";
import { cookies } from "next/headers";
import { createCSRFToken } from "@/lib/csrf";
import { Button } from "@mui/material";


async function Login({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {

  const isError = searchParams?.error

  const csrfToken = cookies().get("csrf-token")?.value || ""
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
      <SignupButtons />
      {isError === "email-not-verified" && <AlertModal msg="이메일 인증을 완료되지 않았습니다." severity="error" />}
    </div>
  )
}

export default Login