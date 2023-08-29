import styles from "./Buttons.module.css";
import React, { ButtonHTMLAttributes, ReactNode } from "react";


interface BlueButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: ButtonHTMLAttributes<HTMLButtonElement>["disabled"];
}

export const BlueButton = ({children, onClick, type, disabled}:BlueButtonProps) => {
  return (
    <button className={styles.blueButton} onClick={onClick} type={type} disabled={disabled}>
      {children}
    </button>
  )
}