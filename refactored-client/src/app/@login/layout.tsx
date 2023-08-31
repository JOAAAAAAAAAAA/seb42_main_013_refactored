import { getRedirectResult } from "firebase/auth";
import Header from "../@header/page"
import { auth } from "../../../firebase/firebaseApp";
import { addUserToFirestore } from "../../../firebase/userController";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {

  try {
    const result = await getRedirectResult(auth)
    console.log("result", result)
    const user = result?.user;
    if(user){
        await addUserToFirestore(user);
        redirect('/')
    }
  }catch(error){
    console.error(error)
  }


  console.log("login layout")
  return (
    <main className="main">
      {children}
    </main>
  )
}