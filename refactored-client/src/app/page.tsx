import { useContext } from "react";
import { BlueButton } from "./components/Buttons";
import { AuthContext } from "@/context/AuthProvider";
import Suggest from "./suggest/Suggest";
import Intro from "./intro/Intro";
import { cookies } from "next/headers";



export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/auth/sessionlogin`,{ cache: 'no-store' })
  const data = await res.json()
  console.log('isLoggedin', data)
  const sessionCookie = cookies().get('session')

  // Parallel Routes를 활용한 server-side conditioal rendering은 페이지를 reload 시켜야 함
  // 로그인 후 메인 Reload 
  // [..cathAll] 로 unmount할 수 있다고 공식문서에 쓰여있지만, 작동되지 않는다.
  // 그렇기 때문에 페이지 이동시마다 Reload 시켜줘야해서 사용자 경험을 저해시킬 수 있음 
  return (
    <>
    {sessionCookie ?<Suggest /> :<Intro />}
    </>
  )
}
