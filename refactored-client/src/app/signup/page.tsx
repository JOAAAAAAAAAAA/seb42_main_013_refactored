import   Backdrop  from "@mui/material/Backdrop";
import AlertModal from "../components/AlertModal";
import { SignupButtons } from "./conponents/SignupButtons";
import SignupForm from "./conponents/SignupForm";
import ErrorModal from "../components/ErrorModal";



async function Signup({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined }
}) {

  const isSuccess = searchParams?.success
  const isError = searchParams?.error
  

  return (
    <div className="container flex h-full flex-col items-center justify-center gap-[--gap-lg] overflow-hidden px-[20px]">
      <SignupForm />
      <SignupButtons />
      {isSuccess && <AlertModal msg="회원가입이 완료되었습니다." redirect="/login" severity="success" />}
      {isError === "email-already-in-use" && <AlertModal msg="이미 사용중인 이메일 입니다." severity="error"/>}
    </div>
  )
}

export default Signup;