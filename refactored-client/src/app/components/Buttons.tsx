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
  oauthProvider: 'facebook' | 'google' | 'kakao' | 'github';
}

export const SignupButton = ({ onClick, oauthProvider }: SignupButtonProps) => {
  return (
    //! 변수 사용시 []로 감싸야 함
    <button className={styles[oauthProvider]} onClick={onClick}>
      <Image src={`/svg/${oauthProvider}.svg`} alt={`${oauthProvider} icon`} width={18} height={18}/>
      {oauthProvider} 계정으로 시작하기
    </button>
  )
}