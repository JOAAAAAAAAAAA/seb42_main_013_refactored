
import SortbyModalWindow from "../dashboard/components/SortbyModalWindow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Tab from "./components/Tab";
import Fab from "@mui/material/Fab";
import Link from "next/link";
import { getPills } from "@/lib/pills";

import DataLists from "./components/DataLists";
import { useSearchParams } from "next/navigation";




async function Dashboard() {
  const data = await getPills();

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