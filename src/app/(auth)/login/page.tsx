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
        {isError && <AlertModal redirect="/login" severity="error" msgCode={isError}/>}
      </div>
  )
}

export default Login