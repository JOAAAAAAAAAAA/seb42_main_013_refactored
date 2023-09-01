"use client"
import Image from "next/image";
import styles from "./Buttons.module.css";
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';
import { useRouter } from "next/navigation";



interface SignupButtonProps {
  onClickHandler: (router: AppRouterInstance) => void;
  authProvider: 'facebook' | 'google' | 'kakao' | 'github';
}

export const SignupButton = ({ onClickHandler, authProvider }: SignupButtonProps) => {
  const router = useRouter();
  return (
    //! 변수 사용시 []로 감싸야 함
    <button className={styles[authProvider]} onClick={()=>onClickHandler(router)}>
      <Image src={`/svg/${authProvider}.svg`} alt={`${authProvider} icon`} width={18} height={18} />
      {authProvider} 계정으로 시작하기
    </button>
  )
}