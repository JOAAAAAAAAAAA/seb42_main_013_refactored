import { z } from "zod";

export const addPillSchema = z.object({
  supplementName: z.string().nonempty("필수 입력 항목입니다."),
  ingredients: z.array(z.string()),
  productType: z.enum(["drug", "supplement"],{errorMap:()=> {return {message: "필수 선택 항목입니다."}}}),
  formulation: z.enum(["capsule","chewable","gummy","powder","tablet","liquid"],{errorMap:()=> {return {message: "필수 선택 항목입니다."}}}),
  //https://blog.herodevs.com/web-fundamentals-avoid-these-javascript-date-object-pitfalls-b9df24fa55e1
  startDate:z.string().default(new Date().toISOString().slice(0,10))
  //input empty 면 ''로 받아짐. null 로 변환
  // .transform((val) => (val === '' ? null : val)) // default 적용
  // new Date() 적용
  .pipe(z.coerce.date({errorMap:()=> {return {message: "유효한 날짜를 입력해주세요."}}})),
  // new Date(null) 오류 방지
  // .transform( v => v === new Date(0) ?null :v) XXX false 뜸
  // .transform( v => v.getTime()===0 ?null :v), 
  endDate: z.string()
  .transform((val) => (val === '' ? null : val)).nullable()
  .pipe(z.coerce.date({errorMap:()=> {return {message: "유효한 날짜를 입력해주세요."}}}))
  .transform( v => v.getTime()===0 ?null :v),
  takingTime: z.array(z.string()),
  pillsLeft: z.coerce.number().int("소숫점을 포함할 수 없습니다.").min(1,"숫자를 입력해주세요."),
  totalCapacity: z.coerce.number().int("소숫점을 포함할 수 없습니다.").min(1,"숫자를 입력해주세요."),
  servingSize: z.coerce.number().min(1,"0 이상의 숫자를 입력해주세요.").int("소숫점을 포함할 수 없습니다."),
  id: z.string().optional(),
})
.superRefine((data, ctx) => {
  if (data.pillsLeft > data.totalCapacity) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_small,
      minimum : data.pillsLeft,
      type: "number",
      path: ["totalCapacity"],
      inclusive: true,
      message: "잔여 알 수 보다 많아야 합니다.",
    })
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: data.totalCapacity,
      type: "number",
      inclusive: false,
      path: ["pillsLeft"],
      message: "전체 용량보다 적어야 합니다.",
    })
  }

  if (data.endDate && data.startDate > data.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.too_big,
      maximum: data.endDate.valueOf(),
      type: "date",
      inclusive: true,
      path: ["startDate"],
      message: "시작일은 종료일보다 앞서야 합니다."
    });
  }
})
;

