import { z } from "zod";

export const addPillSchema = z.object({
  supplementName: z.string().min(1).max(100),
  nutrients: z.array(z.string().min(1).max(100)),
  imageURL: z.string().min(1).max(100),
  supplementType: z.string().min(1).max(100),
  concernId: z.number(),
  expirationDate: z.date(),
  startDate: z.date(),
  endDate: z.date(),
  takingTime: z.array(z.string().min(1).max(100)),
  pillsLeft: z.number(),
  totalCapacity: z.number(),
  dosagePerServing: z.number(),
  dosageInterval: z.number(),
});



// const validationMessage = (validityState) => {
//   let message = ''
//   switch(validityState) {
//     case "rangeOverflow" :
//       message = "전체 용량보다 적어야 합니다."
//     break;
//     case "valueMissing" :
//       message = "필수 입력 항목입니다."
//     break;
//     case "rangeUnderflow" :
//       message = "0 이상의 숫자를 입력해주세요."
//     break;
//     case "customError" :
//       message = "잔여 알 수 보다 많아야 합니다."
//     break;
//     case "badInput" :
//       message = "유효한 값을 입력해주세요."
//     break;
//     default:
//       message = ""
//   }
//   return message
// }