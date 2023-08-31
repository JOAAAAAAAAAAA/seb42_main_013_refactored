"use client"
import Image from "next/image";
import styles from "./Buttons.module.css";


interface SignupButtonProps {
  onClickHandler?: () => void;
  authProvider: 'facebook' | 'google' | 'kakao' | 'github';
}

export const SignupButton = ({ onClickHandler, authProvider }: SignupButtonProps) => {
  return (
    //! 변수 사용시 []로 감싸야 함
    <button className={styles[authProvider]} onClick={onClickHandler}>
      <Image src={`/svg/${authProvider}.svg`} alt={`${authProvider} icon`} width={18} height={18} />
      {authProvider} 계정으로 시작하기
    </button>
  )
}