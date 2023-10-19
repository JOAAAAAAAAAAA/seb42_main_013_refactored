"use client"
import { useRouter, useSearchParams } from "next/navigation";
import MuiAlert, { AlertProps } from '@mui/material/Alert';



export default function AlertModal({
  msgCode,
  redirect,
  severity,
  ...props }:
  {
    msgCode: string
    redirect?: string
    severity?: AlertProps['severity']
    props?: AlertProps
  }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const alertMsg = (errorCode: string) => {
    switch (errorCode) {
      case "email-not-verified":
        return "이메일 인증을 완료되지 않았습니다."
      case "session-cookie-expired":
        return (
          <>
            세션이 만료되었습니다. <br /> 다시 로그인해주세요.
          </>
        );
      case 'no-session-cookie':
        return "로그아웃 되었습니다.";
      case "auth/user-not-found" || "auth/wrong-password":
        return "이메일 혹은 비밀번호가 일치하지 않습니다.";
      case "auth/weak-password":
        return "비밀번호는 6글자 이상이어야 합니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      case "signup-success":
        return (
          <>회원가입이 완료되었습니다.<br/>이메일 인증을 완료해주세요.</>
        );
      default:
        return "로그인에 실패 하였습니다."
    }
  };





  return (
    <div
      onClick={() => redirect ? router.push(redirect) : router.back()}
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
      <div
        className="[@media(min-width:1024px)]:ml-[420px]"
        onClick={(e) => e.stopPropagation()}>
        <MuiAlert
          onClose={() => redirect ? router.push(redirect) : router.back()}
          severity={severity}
          {...props}>{msgCode && alertMsg(msgCode)}</MuiAlert>
      </div>
    </div>
  )
}

