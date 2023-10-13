"use client"

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { signupSchema} from '@/zodSchema/signup';
import { SignUpData } from '@/types';
import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import { Button } from '@mui/material';
import FormInput from '@/app/components/FormInput';

export default function SignupForm() {

  const { register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting } } = useForm<SignUpData>({
    resolver: zodResolver(signupSchema),
  });

  const { signUpwithEmail } = useContext(AuthContext);
  

  return (
    <form
      className="flex w-full flex-col [&>div>div]:py-[--gap-sm]"
      onSubmit={handleSubmit(signUpwithEmail)}
    >
      <FormInput type="text" placeholder="이메일" error={errors?.email}
        register={register("email")} />
      <FormInput type="text" placeholder="닉네임(2~12자)" error={errors?.displayName}
        register={register("displayName")} />
      <FormInput type="password" placeholder="비밀번호(8~32자리)" error={errors?.password} autocomplete="false"
        register={register("password")} />
      <FormInput type="password" placeholder="비밀번호 확인" error={errors?.confirmPassword} autocomplete="false"
        register={register("confirmPassword")} />
      <Button type="submit" sx={{paddingY:"16px"}} disabled={isSubmitting} variant="contained">회원가입</Button>
      <div className="mt-[22px] flex w-full items-center justify-center text-center tracking-wide text-[--black-300]">
        계정이 있으신가요?
        <Link href="/login" className="ml-0.5 text-[--blue-100]" >로그인</Link>
      </div>

    </form>
  )
}