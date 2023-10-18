import { Chip } from "@mui/material";
import { ReactElement } from "react";


export default function RadioChip({
  label,
  name,
  id,
  icon,
  defaultChecked,
  ...props }: {
    label?: string
    name: string
    id: string
    icon: ReactElement
    defaultChecked?: boolean
    props?: React.HTMLAttributes<HTMLDivElement>
  }) {
  return (
    <label
      key={id} htmlFor={id}
      className="bg-transparent"
    >
      <input
        type="radio" name={name} value={id} id={id} defaultChecked={defaultChecked}
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

