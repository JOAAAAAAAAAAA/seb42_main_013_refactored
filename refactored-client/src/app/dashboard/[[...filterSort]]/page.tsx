import SortbyModalWindow from "../components/SortbyModalWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Tab from "../components/Tab";
import Fab from "@mui/material/Fab";
import Link from "next/link";
import { getPills } from "@/lib/pills";
import DataLists from "../components/DataLists";




async function Dashboard({
  searchParams
}:{
  searchParams: URLSearchParams
}) {
  const data = await getPills();
  const filter = searchParams.get('filter')
  const sort = searchParams.get('sort')
  const filteredData = data.filter((pill) => pill.productType === filter)
  // const sortedData = sort && filteredData.sort((a, b) => {
  //   if (sort === "AtoZ") {
  //     return a.supplementName.localeCompare(b.supplementName)
  //   } 
  //   // else if (sort === "pillsLeftAscending") {
  //   //   return a.pillsLeft - b.pillsLeft
  //   // } else if (sort === "pillsLeftDescending") {
  //   //   return b.pillsLeft - a.pillsLeft
  //   // }
  // }

  return (
    <section className="main relative gap-[--gap-md]">
      <Tab />
      <div className="relative mx-0 my-[4px] flex items-center justify-end">
        <SortbyModalWindow />
      </div>
      <DataLists data={data} />
      <Fab
        className="!absolute bottom-[calc(8px+64px)] right-[--gap-sm]"
        LinkComponent={Link}
        href={"/create"}
        size="small" color="primary" aria-label="add">
        <FontAwesomeIcon icon={faPlus} />
      </Fab>
    </section>
  )
}

export default Dashboard;