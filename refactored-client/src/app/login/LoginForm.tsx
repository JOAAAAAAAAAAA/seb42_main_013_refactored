"use client"
import FormInput from "@/app/components/FormInput";
import { AuthContext } from "@/context/AuthProvider";
import { LoginData } from '@/types';

import { loginSchema } from "@/zodSchema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mui/material";
import Link from "next/link";
import { useContext } from "react";
import { useForm } from "react-hook-form";

export default function LoginForm({csrfToken}: {csrfToken: string}) {
  const { register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const { signInwithEmail } = useContext(AuthContext);

  return (
    <form className="flex w-full flex-col [&>div>div]:py-[--gap-sm]" onSubmit={handleSubmit(signInwithEmail)}>
      <FormInput type="text" placeholder="이메일" error={errors?.email} register={register("email")} />
      <FormInput type="password" placeholder="비밀번호" error={errors?.password} register={register("password")} />
      <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
      <Button type="submit" sx={{paddingY:"16px"}} disabled={isSubmitting} variant="contained">로그인</Button>
      <div className="mt-[22px] flex w-full items-center justify-center text-center tracking-wide text-[--black-300]">계정이 없으신가요?<Link href="/signup" className="ml-0.5 text-[--blue-100]">회원가입</Link></div>
    </form>
  )
}