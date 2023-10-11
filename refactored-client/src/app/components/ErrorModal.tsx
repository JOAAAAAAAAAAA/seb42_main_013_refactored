"use client"

import { Backdrop, Button, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import MuiAlert from '@mui/material/Alert';


export default function ErrorModal() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const errorMsg = searchParams.get('error')

  return (
    <Backdrop
      className="z-10"
      open={true} onClick={() => {errorMsg ? router.back() :router.push('/login')}}>
      <div
        className="[@media(min-width:1024px)]:ml-[420px]"
        onClick={(e) => e.stopPropagation()}>
        {errorMsg === 'sessionExpired' &&
          <MuiAlert severity="warning">세션이 만료되었습니다.<br />로그인 후 다시 시도해주세요.</MuiAlert>}
        {errorMsg === 'invalidToken' &&
          <MuiAlert severity="warning">유효하지 않은 토큰입니다.<br />로그인 후 다시 시도해주세요.</MuiAlert>}
        {errorMsg === 'unknown' &&
         <MuiAlert severity="warning">데이터 생성에 실패하였습니다.<br />잠시 후 다시 시도해주세요.</MuiAlert>} 
      </div>
    </Backdrop>
  )
}