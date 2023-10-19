import { cookies } from "next/headers";
import Header from "../components/Header";
import Navigation from "../components/Nav";


export default function HomeLayout({
  intro,
  suggest,
  children,
}: {
  intro: React.ReactNode;
  suggest: React.ReactNode;
  children: React.ReactNode;
}) {
  const isLogin = cookies().has('session')
  return(
  isLogin 
  ? <>
  <Header withLogout={true} />
  {suggest}
  <Navigation />
  </> 
  : <>{intro}
  {children}
  </>)
}
