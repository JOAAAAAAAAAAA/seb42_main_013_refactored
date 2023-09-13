import { CSRF_experimental } from "@/auth"

export function SignIn({ provider, ...props }: any) {

  return (
    <form action={`/api/auth/signin`} method="post">
      <button {...props}/>
      <CSRF_experimental/>
    </form>
  )
}
