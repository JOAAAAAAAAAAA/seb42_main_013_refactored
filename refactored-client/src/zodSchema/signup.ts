import { z } from "zod";

export const signupSchema = z
.object({
  email: z.string()
  .nonempty("이메일을 입력해 주세요.")
  .regex(new RegExp("^\\S*$"), "이메일에 공백을 포함할 수 없습니다.")
  .email("올바른 이메일 형식이 아닙니다.")
  // email은 regex 적용 안됨
  // .refine((data) => !data.includes(' '), "이메일에 공백을 포함할 수 없습니다.")
  //TODO
  // .refine(async (id) => {
  // verify that ID exists in database
  //   return true;
  // });
  ,
  displayName: z.string()
  .nonempty("닉네임을 입력해 주세요.")
  .regex(new RegExp("^\\S*$"), "이메일에 공백을 포함할 수 없습니다.")
  .min(2,"2자 이상 입력해주세요")
  .max(12,{
    message:"15자 이하로 입력해주세요.",
  })
  ,
  password: z.string()
  .nonempty("비밀번호를 입력해 주세요.")
  .regex(new RegExp("^\\S*$"), "비밀번호에 공백을 포함할 수 없습니다.")
  .min(8,{
    message:"비밀번호는 영문, 숫자, 특수문자를 포함하여 8자 이상이어야 합니다.",
  })
  // 하나하나 보여주는 것보다 refine으로 한번에 보여주는게 나을듯
  // .regex(new RegExp(".*[A-Z].*"), "One uppercase character")
  // .regex(new RegExp(".*[a-z].*"), "One lowercase character")
  // .regex(new RegExp(".*\\d.*"), "One number")
  .max(32,{
    message:"비밀번호는 최대 32글자 이하여야 합니다.",
  })
  .refine((data) => /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*?[#?!@$%^&*-]).{8,32}$/.test(data), "영문, 숫자, 특수문자를 조합하여 설정해 주세요."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "비밀번호가 일치하지 않습니다.",
});




