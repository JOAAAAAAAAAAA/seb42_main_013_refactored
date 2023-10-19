import Header from "../components/Header";
import Navigation from "../components/Nav";
import { cookies } from "next/headers";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;}) {

    return(
      <>
      <Header />
      {children}
      </>
    )
}