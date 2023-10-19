import AlertModal from "@/app/components/AlertModal";
import LoginForm from "./LoginForm";
import { headers } from "next/headers";
import Header from "@/app/components/Header";
import { SignupButtons } from "@/app/components/SignupButtons";


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
      <div className="main items-center justify-center gap-[--gap-lg] overflow-hidden px-[20px]">
        <div className="ml-[10px] text-[40px]">Welcome!</div>
        <LoginForm csrfToken={csrfToken} />
        <SignupButtons csrfToken={csrfToken} />
        {isError === "email-not-verified" && <AlertModal redirect="/login" msg="이메일 인증을 완료되지 않았습니다." severity="error" />}
        {isError === "session-cookie-expired" && <AlertModal redirect="/login" msg={<>세션이 만료되었습니다. <br /> 다시 로그인해주세요.</>} severity="error" />}
        {isError === "no-session-cookie" && <AlertModal redirect="/login" msg="로그인을 해주세요." severity="error" />}
      </div>
  )
}

export default Login