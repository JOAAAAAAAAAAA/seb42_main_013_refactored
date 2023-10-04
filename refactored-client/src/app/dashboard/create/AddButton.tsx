import { Chip } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";


export default function AddButton({
  fieldset
}: {
  fieldset: string;
}) {
  const pathname = usePathname()
  console.log(`${pathname}?fieldset=${fieldset}`)
  return (
    <Chip
      size="small"
      clickable
      sx={{
        margin: "2px 0"
      }}
      className="my-[2px] aspect-square !h-[20px] !w-[20px] p-[2px] text-center !text-[10px] [&_span]:px-0"
      color="primary"
      // mui + Link ver 2
      // icon insert 시, 기본 span default로 배치됨 
      // icon={<OthersSVGSprite id="add" width="1.2em" color="currentColor" height="1.2em" />}
      label={(
        <Link href={`${pathname}?fieldset=${fieldset}`}>
          <FontAwesomeIcon icon={faPlus} />
        </Link>
      )}
    />
  )
}

