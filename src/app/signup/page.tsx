import   Backdrop  from "@mui/material/Backdrop";
import AlertModal from "../components/AlertModal";
import { SignupButtons } from "./conponents/SignupButtons";
import SignupForm from "./conponents/SignupForm";
import ErrorModal from "../components/ErrorModal";
import { headers } from "next/headers";



async function Signup({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {

  const isSuccess = searchParams?.success
  const isError = searchParams?.error
  const csrfToken = headers().get("X-CSRF-Token") || ''

  return (
    <div className="container flex h-full flex-col items-center justify-center gap-[--gap-lg] overflow-hidden px-[20px]">
      <SignupForm />
      <SignupButtons csrfToken={csrfToken} />
      {isSuccess && <AlertModal msg={<>회원가입이 완료되었습니다.<br/>이메일 인증을 완료해주세요.</>} redirect="/login" severity="success" />}
      {isError === "email-already-in-use" && <AlertModal msg="이미 사용중인 이메일 입니다." severity="error"/>}
    </div>
  )
}

export default Signup;