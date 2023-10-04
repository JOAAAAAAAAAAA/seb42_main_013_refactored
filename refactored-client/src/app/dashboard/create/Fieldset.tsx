import { Typography } from "@mui/material";


export default function Fieldset({
  children,
  fieldsetName,
  ...props }: {
    children: React.ReactNode;
    fieldsetName: string;
    props?: React.HTMLAttributes<HTMLDivElement>
  }) {
  return (
    <fieldset className="mb-[--gap-md] flex w-full flex-col text-[rgba(0,0,0,0.6)]" {...props}>
      <Typography
        variant="subtitle1"
        className="text-[rgba(0,0,0,0.6)]"
      >{fieldsetName}</Typography>
      <div className=" flex w-full flex-wrap items-end gap-[--gap-sm]">
        {children}
      </div>
    </fieldset>
  )
}