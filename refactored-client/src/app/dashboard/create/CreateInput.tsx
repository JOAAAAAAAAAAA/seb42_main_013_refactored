import { TextField, InputBaseComponentProps } from "@mui/material";

export default function CreateInput({
  id,
  name,
  type,
  label,
  placeholder,
  onChange,
  inputProps,
  ...props
}: {
  id: string
  name: string
  type: string
  label?: string
  placeholder?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  inputProps?: InputBaseComponentProps
  props?: React.HTMLAttributes<HTMLInputElement>
}) {
  return (
    <TextField
      id={id}
      type={type}
      name={name}
      onChange={onChange}
      inputProps={inputProps}
      label={label}
      variant="standard"
      sx={{
        '& .MuiFormLabel-asterisk,.MuiInputLabel-asterisk':{
          display: "none"
        },
      }}
      className="cleanInput flex-1"
      placeholder={placeholder}
      {...props}
    />
  )
}
