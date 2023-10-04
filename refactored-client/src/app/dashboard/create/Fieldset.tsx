import { Typography } from "@mui/material";
import { FlattenedError } from "@/types";
import { FormHelperText } from "@mui/material";


export default function Fieldset({
  children,
  fieldsetName,
  errorMessage,
  ...props }: {
    children: React.ReactNode;
    fieldsetName: string;
    props?: React.HTMLAttributes<HTMLDivElement>
    errorMessage?: FlattenedError[]
  }) {
  const isError = errorMessage
  return (
    <fieldset className="mb-[--gap-md] flex w-full flex-col text-[rgba(0,0,0,0.6)]" {...props}>
      <Typography
        variant="subtitle1"
        className={errorMessage ? "text-[--red-100]" : "text-[rgba(0,0,0,0.8)]"}
      >
        {fieldsetName}
      </Typography>
      <div className=" flex w-full flex-wrap items-end gap-[--gap-sm]">
        {children}
      </div>
      {isError && <FormHelperText error>{errorMessage[0].message}</FormHelperText>}
    </fieldset>
  )
}