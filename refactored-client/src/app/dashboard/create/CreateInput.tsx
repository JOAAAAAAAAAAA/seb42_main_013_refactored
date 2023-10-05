import { TextField, InputBaseComponentProps } from "@mui/material";

export default function CreateInput({
  id,
  name,
  type,
  label,
  placeholder,
  inputProps,
  error,
  helperText,
  ...props
}: {
  id: string
  name: string
  type: string
  label?: string
  placeholder?: string
  error?: boolean
  helperText?: string
  inputProps?: InputBaseComponentProps
  props?: React.HTMLAttributes<HTMLInputElement>
}) {
  return (
    <TextField
      id={id}
      type={type}
      name={name}
      inputProps={inputProps}
      label={label}
      error={error}
      helperText={helperText}
      variant="standard"
      sx={{
        '& .MuiFormLabel-asterisk,.MuiInputLabel-asterisk':{
          display: "none"
        },
      }}
      className={`
      cleanInput flex-1
      !text-[rgba(0,0,0.8)]
      ${name==="servingSize"||name==="supplementName" ?"[&_label]:text-[rgba(0,0,0,0.8)]" :""} 
      `} 
      

      placeholder={placeholder}
      {...props}
    />
  )
}
