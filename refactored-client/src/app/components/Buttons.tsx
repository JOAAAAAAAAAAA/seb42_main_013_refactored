import Image from "next/image";
import styles from "./Buttons.module.css";
import React, { ButtonHTMLAttributes, ReactNode } from "react";


interface BlueButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
}

export const BlueButton = ({ children, onClick, type, disabled }: BlueButtonProps) => {
  return (
    <button className={styles.blueButton} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  )
}

interface SignupButtonProps {
  onClick?: () => void;
  authProvider: 'facebook' | 'google' | 'kakao' | 'github';
}

export const SignupButton = ({ onClick, authProvider }: SignupButtonProps) => {
  return (
    //! 변수 사용시 []로 감싸야 함
    <button className={styles[authProvider]} onClick={onClick}>
      <Image src={`/svg/${authProvider}.svg`} alt={`${authProvider} icon`} width={18} height={18}/>
      {authProvider} 계정으로 시작하기
    </button>
  )
}