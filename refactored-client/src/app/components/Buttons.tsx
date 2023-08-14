import styles from "./Buttons.module.css";
import React, { FC, ReactNode } from "react";


interface BlueButtonProps {
  children?: ReactNode;
  text: string;
  onClick?: () => void;
}

export const BlueButton: FC<BlueButtonProps> = ({children, onClick, text}) => {
  return (
    <button className={styles.blueButton} onClick={onClick}>
      {text}
      {children}
    </button>
  )
}