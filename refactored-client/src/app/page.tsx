'use client';
import { useContext } from "react";
import { BlueButton } from "./components/Buttons";
import { AuthContext } from "@/context/AuthProvider";




export default function Home() {
  const { sessionLogout } = useContext(AuthContext);

  return (
    // <div className='islogedin'>
    //   <BlueButton onClick={sessionLogout}>로그아웃하기</BlueButton>
    // </div>
    <div>
      메인
    </div>
  )
}
