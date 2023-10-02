import { FieldError, FieldValues, UseFormRegisterReturn } from "react-hook-form";



type FormInputProps<TFormValue extends keyof FieldValues> = {
  type: string;
  placeholder?: string;
  label?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
  autocomplete?: string;
};

function FormInput<TFormValue extends keyof FieldValues>({
  type,
  placeholder,
  label,
  error,
  register,
  autocomplete,
}: FormInputProps<TFormValue>) {
  // focus 대신 focus-within 사용하면 상태 props 전달 필요 없음
  // const [isFocus, setIsFocus] = useState(false)

  // const clear = () => {
  //   setData({...data,[name]:""})
  // }
  return (
    <div className=
    {`flex-1 ${error ? "" :"mb-[22px]"}`}>
      {label && <label
        htmlFor={register.name}
        className={`after:text-base after:font-bold after:text-[--black-200] ${register.required ? "after:content-[*]" : ""}`}
      >{label}</label>}
      <div className={`flex flex-1 border 
        ${!error ? "border-[--black-400] focus-within:border focus-within:border-[--blue-100] focus-within:shadow-[0_0_2px_2px_rgba(5,145,255,0.1)]" : "border-[--red-100]"} 
        relative rounded-[5px] px-2 
        transition-colors hover:bg-[#F7F9FA]`}
      >
        <input
          className={`relative h-[1.5rem] w-full border-none bg-transparent text-base text-[--black-100] shadow-none outline-none
        placeholder:text-[--black-400]
        ${type === "password" && "!h-8"}
        ${type === "text" && "!h-8"}
        ${type === "date" && `
        w-full before:absolute before:left-0
        before:text-[--black-400] focus:hidden`}
        ${type === "time" && "min-w-[100px]"}
        `}
          type={type}
          placeholder={placeholder}
          id={register.name}
          autoComplete={autocomplete}
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
        <p className="mb-[4px] text-[12px] text-[--red-100]">
          {error.message}
        </p>
      )}
    </div>
  )
}

export default FormInput;