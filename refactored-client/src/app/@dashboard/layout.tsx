
import { redirect } from "next/navigation";
import { auth } from "../../../firebase/firebaseApp";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const isLoggedin = auth.currentUser;
  // if(!isLoggedin) {
  //   console.log("리다이렉트시키자!")
  //   redirect("signup")
  // }
  console.log("dashboard layout")
  return (
  

  <main className="main">
    {children}
  </main>
  )
}
