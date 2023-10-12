import { z } from "zod";

export const loginSchema = z
.object({
  email: z.string()
  .nonempty("이메일을 입력해 주세요.")
  .regex(new RegExp("^\\S*$"), "이메일에 공백을 포함할 수 없습니다.")
  .email("올바른 이메일 형식이 아닙니다."),
  password: z.string()
  .nonempty("비밀번호를 입력해 주세요.")
  .regex(new RegExp("^\\S*$"), "비밀번호에 공백을 포함할 수 없습니다.")
  .min(8,{
    message:"비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.",
  })
  .max(32,{
    message:"비밀번호는 최대 32글자 이하여야 합니다.",
  })
  .refine((data) => /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[#?!@$%^&*-]).{8,32}$/.test(data), "영문, 숫자, 특수문자를 조합하여 설정해 주세요."),
  csrfToken: z.string().nonempty(),
})



