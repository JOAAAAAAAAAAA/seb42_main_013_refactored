import { faChildReaching } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import Navigation from "../components/Nav";
import { cookies } from "next/headers";

export default function Default({
  header,
  nav,
  intro,
  suggest,
  children,
}: {
  intro: React.ReactNode;
  suggest: React.ReactNode;
  header: React.ReactNode;
  nav: React.ReactNode;
  children: React.ReactNode;}) {
    const isLogin = cookies().has('session')

    return(
      <>
      <Header />
      {children}
      <Navigation />
      </>
    )
}