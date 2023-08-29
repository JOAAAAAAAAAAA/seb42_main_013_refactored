import { z } from "zod";

export const signupSchema = z
.object({
  email: z.string().email({
    message: "이메일 형식이 아닙니다.",
  }).nonempty({
    message: "이메일을 입력해 주세요.",
  }).refine((data) => !data.includes(' '), "이메일에 공백을 포함할 수 없습니다."),
  //TODO
  // .refine(async (id) => {
  // verify that ID exists in database
  //   return true;
  // });
  displayName: z.string().min(4,{
    message:"닉네임은 최소 4글자 이상이어야 합니다.",
  }).max(12,{
    message:"닉네임은 최대 12글자 이하여야 합니다.",
  }).nonempty({
    message: "닉네임을 입력해 주세요.",
  })
  .refine((data) => !data.includes(' '), "닉네임에 공백을 포함할 수 없습니다.")
  ,
  password: z.string()
  .min(8,{
    message:"비밀번호는 최소 8글자 이상이어야 합니다.",
  })
  // 하나하나 보여주는 것보다 refine으로 한번에 보여주는게 나을듯
  // .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
  // .regex(new RegExp(".*[a-z].*"), "One lowercase character")
  // .regex(new RegExp(".*\\d.*"), "One number")
  .max(32,{
    message:"비밀번호는 최대 32글자 이하여야 합니다.",
  })
  .nonempty({
    message: "비밀번호를 입력해 주세요.",
  })
  .refine((data) => /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*?[#?!@$%^&*-]).{8,32}$/.test(data), "영문 대소문자, 숫자, 특수문자를 조합하여 설정해 주세요."),
  confirmPassword: z.string().min(6).max(100),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "비밀번호가 일치하지 않습니다.",
});

export type signupData = z.infer<typeof signupSchema>;



