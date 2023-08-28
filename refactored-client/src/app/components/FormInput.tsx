"use client";
import { useState } from "react";
import { FieldError, FieldValues, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";




// export const RealInput = styled.input`
//     border: none;
//     background-color: transparent;
//     box-shadow: none ;
//     font-size: 16px;
//     height: 32px;
//     width: 100%;
//     outline: none;
//     position:relative;
//     color: var(--black-100);
//   ::-webkit-outer-spin-button, ::-webkit-inner-spin-button{
//     -webkit-appearance: none;
//   }
//   ::-webkit-calendar-picker-indicator{
//     position:absolute;
//       /* 부모 relative - 자식 absolute */
//       /* 부모 relative 지정 안해주면 전체 화면 cover된다 */
//     left:0;
//     top:0;
//     width: 100%;
//     height: 100%;
//     color: transparent;
//     background: transparent;
//     cursor: pointer;
//   }
//   ::placeholder{
//     color: var(--black-400)
//   }
//   &[type='date']::-webkit-datetime-edit {
//     display: ${(props) => (!!props.value) ? "inline-block" : "none"};
//   }
//   &[type='date']::before{
//     position: absolute;
//     left: 0px;
//     color: var(--black-400);
//     content: "${(props) => props.placeholder}";
//     width: 100%;
//     display: ${(props) => !!props.value && "none"};
//   }
//   &[type='time']{
//     min-width: 100px;
//   }
// `
// export const DeleteBtn = styled.div`
//   display: flex;
//   align-items: center;
//   margin-left: 8px;
//   color: var(--black-200);
//   >button{
//     opacity : ${(props) => props.value ? "1" : "0"};
//     cursor: pointer;
//     background-color: transparent;
//     outline: 0;
//     border: 0;
//     width: 20px;
//     height: 20px;
//   }
//   svg{
//     color: var(--black-400);
//     width: 100%;
//     height: 100%;
//     fill: currentColor;
//   }
// `
// const ValidityMsg = styled.div`
//   color: rgb(240, 86, 86);
//   font-size: 12px;
//   opacity : ${(props) => props.isValid ? "0" : "1"};
// `

type FormInputProps<TFormValue extends keyof FieldValues> = {
  type: string;
  placeholder: string;
  label?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
};

function FormInput<TFormValue extends keyof FieldValues>({
  type,
  placeholder,
  label,
  error,
  register,
}: FormInputProps<TFormValue>) {
  // focus 대신 focus-within 사용하면 상태 props 전달 필요 없음
  // const [isFocus, setIsFocus] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const [validityState, setValidityState] = useState("")
  
  // const clear = () => {
  //   setData({...data,[name]:""})
  // }
  console.log(register)
  console.log(error)
  return (
    <div>
      {label && <label
        htmlFor={register.name}
        className={`font-bold text-[--black-200] text-base after:content-[${register.required ? "*" : ""}]`}
      >{label}</label>}
      <div className={`flex flex-1 border 
        ${isValid ? "focus-within:border-2 focus-within:border-[--blue-100] focus-within:shadow-[0_0_2px_2px_rgba(5, 145,255, .1)] border-[--black-400]" :"border-[--red-100]"} 
        rounded-[5px] py-2 relative 
        hover:bg-[#F7F9FA] transition-colors 
        after:absolute after:left-0 after:bottom-[-18px] after:font-xs after:text-rose-500 after:content-[${validityState}]`}
      >
        <input 
        className="border-none bg-transparent shadow-none text-base h-8 w-full outline-none relative text-[--black-100]
        placeholder:text-[--black-400]
        "
        type={type}
        placeholder={placeholder}
        id={register.name}
        {...register}
        />
        {/* <RealInput
          onFocus={()=>setIsFocus(true)}
          onBlur={blurHandler}
          type={type} 
          value={data[name]}
          onChange={changeHandler} 
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          name={name}
          onInvalid={messageStopper}
        /> */}
        {/* { name === "ingredientAmount" &&
          <DeleteBtn>mg</DeleteBtn>
        } */}
        {/* { name === "dose" &&
          <DeleteBtn>알</DeleteBtn>
        } */}
        {/* { type!=="date" &&
        <>
          <DeleteBtn value={!!data[name]} >
            <button type="button" onClick={()=>clear()}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </button>
          </DeleteBtn>
        </>
        } */}
      </div>
    </div>
  )
}

export default FormInput;