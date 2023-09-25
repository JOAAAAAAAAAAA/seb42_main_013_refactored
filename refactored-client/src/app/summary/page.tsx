"use client";
import { useContext, useEffect, useState } from "react";
import { PillDataFilter, PillDataSort } from "@/types.js";
import SortbyModalWindow from "@/app/components/SortbyModalWindow";
import { AuthContext } from "@/context/AuthProvider";

import HealthSvgSprite from "../(home)/@suggest/HealthSvgSprite";






function Summary () {

  
  console.log('서버액션으로 리디랙션은 진행중')
  const [sortby, setSortby] = useState<PillDataSort>("pillsLeftAscending");
  const [tab, setTab] = useState<PillDataFilter>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isdeleteOpen, setIsdeleteOpen] = useState(false);
  const [data, setData] = useState([])

  const {authUser, isLoggedIn} = useContext(AuthContext);


  return (
    <div className="flex h-full flex-col px-[20px] py-[24px]">
      


      <div className="flex p-[3px] w-full justify-between bg-[--black-500] rounded-[24px] gap-[16px]">
        <div className={`text-center ${tab==="all" ?"bg-white shadow-[0_1px_3px_rgba(47,43,67,0.1)] shadow-[inset_0_-1px_0_rgba(47,43,67,0.1)] text-[--black-200]" :"bg-[--black-500] text-[--black-300]"} rounded-[21px] p-[4px] flex-1 cursor-pointer`} 
        onClick={() => setTab("all")}>
          종합
        </div>
        <div className={`text-center ${tab==="supplement" ?"bg-white shadow-[0_1px_3px_rgba(47,43,67,0.1)] shadow-[inset_0_-1px_0_rgba(47,43,67,0.1)] text-[--black-200]" :"bg-[--black-500] text-[--black-300]"} rounded-[21px] p-[4px] flex-1 cursor-pointer`} 
        onClick={() => setTab("supplement")}>
          영양제
        </div>
        <div className={`text-center ${tab==="drug" ?"bg-white shadow-[0_1px_3px_rgba(47,43,67,0.1)] shadow-[inset_0_-1px_0_rgba(47,43,67,0.1)] text-[--black-200]" :"bg-[--black-500] text-[--black-300]"} rounded-[21px] p-[4px] flex-1 cursor-pointer`}
        onClick={() => setTab("drug")}>
          처방약
        </div>
      </div>
      <div className="flex justify-end items-center my-[4px] mx-0 relative">
          <SortbyModalWindow setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}  setSortby={setSortby} sortby={sortby}/>
      </div>
      {/* <SummartLists>
        {(!data || data.length===0)&& <>
        <NoSupplementDataImg src={NoSupplementData}/>
        <NoDataComment>등록된 데이터가 없습니다.</NoDataComment>
        </>}
        {data && data.map((ele, idx) => {
          return <SummaryList key={ele.detailSupplementId} isdeleteOpen={isdeleteOpen} openDeleteHanlder={openDeleteHanlder} pill={ele} data={data} setData={setData}/>;
        })}
      </SummartLists> */}
      {/* {isdeleteOpen && <DeleteConfirm data={data} setData={setData} openDeleteHanlder={openDeleteHanlder}/>} */}
    </div>
  )
}

export default Summary;