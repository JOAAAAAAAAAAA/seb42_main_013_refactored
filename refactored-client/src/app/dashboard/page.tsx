
import { useContext, useEffect, useState } from "react";
import { PillDataFilter, PillDataSort } from "@/types.js";
import SortbyModalWindow from "@/app/dashboard/SortbyModalWindow";
import { AuthContext } from "@/context/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import HealthSvgSprite from "../(home)/@suggest/HealthSvgSprite";
import Image from "next/image";
import DataList from "./DataList";
import Tab from "./Tab";
import Fab from "@mui/material/Fab";
import Link from "next/link";




function Dashboard() {

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isdeleteOpen, setIsdeleteOpen] = useState(false);
  const data = [

    {
      detailSupplementId: 1,
      dosageInterval: 3,
      dosagePerServing: 1,
      endDate: '2023-01-01',
      pillsLeft: 3,
      startDate: '2023-01-01',
      supplementName: '오메가3',
      takingTime: '3시',
      totalCapacity: '50',
    }
  ]


  return (
    <section className="main relative gap-[--gap-md]">
      <Tab />
      <div className="relative mx-0 my-[4px] flex items-center justify-end">
        <SortbyModalWindow />
      </div>
      <ul className="relative flex h-full flex-col gap-[--gap-sm]">
        {(!data || data.length === 0) && <>
          <Image src="/images/NoSupplementData.png" alt="no data" />
          <span>등록된 데이터가 없습니다.</span>
        </>}
        {data && data.map((ele, idx) => {
          return <DataList key={ele.detailSupplementId} />;
        })}
      <Fab
        className="!absolute bottom-[--gap-sm] right-0"
        LinkComponent={Link}
        href={"/dashboard/create"}
        size="small" color="primary" aria-label="add">
        <FontAwesomeIcon icon={faPlus} />
      </Fab>
      </ul>
      {/* {isdeleteOpen && <DeleteConfirm data={data} setData={setData} openDeleteHanlder={openDeleteHanlder}/>} */}
    </section>
  )
}

export default Dashboard;