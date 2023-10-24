import InputBase from "@mui/material/InputBase"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import  IconButton  from "@mui/material/IconButton";
import { searchItem } from "@/lib/shopping";
import Loading from "./search/loading";

export default function SearchForm() {

  
  return (
    <form className='flex w-full border-b border-[#999999]'
      action={searchItem}
    >
      <InputBase type="text" name="query" placeholder="새로운 영양제 탐색" fullWidth />
      {/* <input type="text" name="query"/> */}
      {/* <button type="submit">검색</button> */}
      <IconButton type="submit" aria-label="search" size="small">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </IconButton>
      <Loading />
    </form>
  )
}