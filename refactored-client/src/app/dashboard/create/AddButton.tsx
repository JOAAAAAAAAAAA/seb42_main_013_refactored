import { NextLinkComposed } from "@/mui/Link"
import { Chip } from "@mui/material"
import OthersSVGSprite from "../OthersSVGSprite"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


export default function AddButton({
  fieldset
}:{
  fieldset:string;
}) {
  return (
    <Chip
      size="small"
      clickable
      className="aspect-square !h-[20px] !w-[20px] p-[2px] text-center !text-[10px] [&_span]:px-0"
      color="primary"
      // mui + Link ver 2
      component={NextLinkComposed}
      to={{
        query: { modal: fieldset },
        // pathname: '/?modal=true'
      }}
      // icon insert 시, 기본 span default로 배치됨 
      // icon={<OthersSVGSprite id="add" width="1.2em" color="currentColor" height="1.2em" />}
      label={(
        <FontAwesomeIcon icon={faPlus}/>
      )}
      />
  )
}

