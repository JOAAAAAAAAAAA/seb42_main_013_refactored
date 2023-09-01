import { getRedirectResult } from "firebase/auth";
import Header from "../@header/page"
import { auth } from "../../../firebase/firebaseApp";
import { addUserToFirestore } from "../../../firebase/userController";
import { redirect } from "next/navigation";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <main className="main">
      {children}
    </main>
  )
}