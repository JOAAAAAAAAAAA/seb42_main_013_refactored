"use client";
import { useState } from "react";
import { FieldError, FieldValues, UseFormRegister, UseFormRegisterReturn } from "react-hook-form";



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

  // const clear = () => {
  //   setData({...data,[name]:""})
  // }
  console.log(error?.message)
  return (
    <div>
      {label && <label
        htmlFor={register.name}
        className={`font-bold text-[--black-200] text-base after:content-[${register.required ? "*" : ""}]`}
      >{label}</label>}
      <div className={`flex flex-1 border 
        ${!error ? "focus-within:border focus-within:border-[--blue-100] focus-within:shadow-[0_0_2px_2px_rgba(5,145,255,0.1)] border-[--black-400]" : "border-[--red-100]"} 
        rounded-[5px] px-2 relative 
        hover:bg-[#F7F9FA] transition-colors 
        after:absolute after:left-0 after:bottom-[-18px] after:font-xs after:text-rose-500`}
      >
        <input
          className={`border-none bg-transparent shadow-none text-base h-8 w-full outline-none relative text-[--black-100]
        placeholder:text-[--black-400]
        ${type === "date" && `before:absolute before:left-0 before:text-[--black-400] before:content-[${placeholder}] w-full focus:hidden`}
        ${type === "time" && "mind-w-full"}
        `}
          type={type}
          placeholder={placeholder}
          id={register.name}
          {...register}
        />
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
      {error && (
        <p className="text-[--red-100] text-[12px]">
          {error.message}
        </p>
      )}
    </div>
  )
}

export default FormInput;