import { ButtonBase, Chip } from "@mui/material"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { createQuery } from "@/lib/query";


export default function AddButton({
  fieldset
}: {
  fieldset: string;
}) {

  const searchParams = useSearchParams()


  return (
    //오류 뜨지만 잘 작동함
    <Link href={createQuery('fieldset', fieldset, searchParams)} scroll={false}>
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
      // icon 대신 라벨로 대체
      // icon={<OthersSVGSprite id="add" width="1.2em" color="currentColor" height="1.2em" />}
      label={(<FontAwesomeIcon icon={faPlus} />)}
    />
    </Link>
  )
}

