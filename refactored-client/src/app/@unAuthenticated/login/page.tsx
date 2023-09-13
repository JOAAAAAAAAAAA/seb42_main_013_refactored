import { SignIn } from "@/app/auth-components"



function Login (){
  return(
    <>
        <SignIn provider="github">Sign in with GitHub</SignIn>

    </>
  )
}

export default Login