"use client"

import { Backdrop, Button, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import MuiAlert from '@mui/material/Alert';


export default function SessionExpireModal() {
  const searchParams = useSearchParams()
  const router = useRouter()

  return (
    <Backdrop
      className="z-10"
      open={true} onClick={() => router.push('/login')}>
      <div 
      className="[@media(min-width:1024px)]:ml-[420px]"
      onClick={(e) => e.stopPropagation()}>
        <MuiAlert severity="warning">세션이 만료되었습니다. <br />
          로그인 후 다시 시도해주세요.</MuiAlert>
      </div>
    </Backdrop>
  )
}