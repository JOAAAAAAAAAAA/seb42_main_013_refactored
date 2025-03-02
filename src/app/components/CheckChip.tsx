import  Chip  from "@mui/material/Chip";
import { ReactElement } from "react";


export default function CheckChip({
  label,
  name,
  id,
  icon,
  ...props }: {
    label?: string
    name: string
    id: string
    icon?: ReactElement
    props?: React.HTMLAttributes<HTMLDivElement>
  }) {
  return (
    <label
      key={id} htmlFor={id}
      className="bg-transparent"
    >
      <input
        type="checkbox" name={name} value={id} id={id}
        {...props}
        className="peer appearance-none" />
      <Chip
        size="small"
        variant="outlined"
        label={label}
        // click css 유지
        clickable
        className="
        z-0 cursor-pointer
        peer-checked:bg-[--blue-100] peer-checked:text-white
        peer-checked:hover:bg-[rgb(63,93,164)] [&_svg]:ml-[6px] [&_svg]:mr-[-4px]"
        color="primary"
        icon={icon}
      />
    </label>
  )
}

