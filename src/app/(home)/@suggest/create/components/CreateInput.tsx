import { TextField, InputBaseComponentProps } from "@mui/material";

export default function CreateInput({
  id,
  name,
  type,
  label,
  placeholder,
  error,
  required,
  helperText,
  defaultValue,
  ...props
}: {
  id: string
  name: string
  type: string
  label?: string
  placeholder?: string
  error?: boolean
  required?: boolean
  helperText?: string
  defaultValue?: string | number | boolean
  props?: React.HTMLAttributes<HTMLInputElement>
}) {
  return (
    <TextField
      id={id}
      type={type}
      name={name}
      label={label}
      error={error}
      required={required}
      helperText={helperText}
      defaultValue={defaultValue}
      variant="standard"
      sx={{
        '& .MuiFormLabel-asterisk,.MuiInputLabel-asterisk':{
          display: "none"
        },
      }}
      className={`
      cleanInput flex-1
      !text-[rgba(0,0,0.8)]
      ${name==="servingSize"||name==="supplementName" ?"flex-initial [&_label]:text-[rgba(0,0,0,0.8)]" :""}`} 
      placeholder={placeholder}
      {...props}
    />
  )
}
