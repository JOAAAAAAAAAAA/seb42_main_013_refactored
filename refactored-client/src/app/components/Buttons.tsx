import styles from "./Buttons.module.css";
import React, { ReactNode } from "react";


interface BlueButtonProps {
  children?: ReactNode;
  onClick?: () => void;
}

export const BlueButton = ({children, onClick}:BlueButtonProps) => {
  return (
    <button className={styles.blueButton} onClick={onClick}>
      {children}
    </button>
  )
}