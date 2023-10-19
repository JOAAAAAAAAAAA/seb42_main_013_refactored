import AlertModal from "@/app/components/AlertModal";
import Header from "@/app/components/Header";
import { SignupButtons } from "@/app/components/SignupButtons";
import SignupForm from "@/app/components/SignupForm";
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
    <>

    <div className="container flex h-full flex-col items-center justify-center gap-[--gap-lg] overflow-hidden px-[20px]">
      <SignupForm />
      <SignupButtons csrfToken={csrfToken} />

      {isSuccess && <AlertModal msgCode="signup-success" redirect="/login" severity="success" />}
      {isError && <AlertModal msgCode={isError} severity="error"/>}
    </div>
    </>
  )
}

export default Signup;