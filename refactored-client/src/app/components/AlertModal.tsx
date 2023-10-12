"use client"


import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import MuiAlert, { AlertProps } from '@mui/material/Alert';


export default function AlertModal({
  msg,
  redirect,
  ...props}:
  {
    msg: string
    redirect?: string
    props?: AlertProps
  }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const errorMsg = searchParams.get('error')

  return (
    <div 
    onClick={()=>redirect ? router.push(redirect) : router.back()}
    className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div
        className="[@media(min-width:1024px)]:ml-[420px]"
        onClick={(e) => e.stopPropagation()}>
          <MuiAlert 
          onClose={()=>redirect ? router.push(redirect) : router.back()}
          {...props}>{msg}</MuiAlert>
      </div>
    </div>
  )
}