"use client"
import { PillDataSort } from "@/types.js";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";



function SortbyModalWindow({
  setIsModalOpen,
  isModalOpen,
  setSortby,
  sortby }: {
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    isModalOpen: any;
    setSortby: Dispatch<SetStateAction<PillDataSort>>;
    sortby: PillDataSort
  }) {

  const sortName = new Map([
    ["AtoZ", "가나다순"],
    ["pillsLeftAscending", "남은약 적은순"],
    ["pillsLeftDescending", "남은약 많은순"],
    ["expiryDate", "소비기한 임박순"]
  ])

  const sortClickHandler = (sortby: PillDataSort) => {
    setSortby(sortby)
    setIsModalOpen(!isModalOpen)
  }

  return (
    <button className="text-[14px] text-[--black-100] flex items-center border-none bg-transparent cursor-pointer outline-none"
      onClick={() => setIsModalOpen(!isModalOpen)}>
      <span>{sortName.get(sortby)}</span>
      <Image src="/svg/arrow.svg" alt="arrow" width={20} height={20} className={isModalOpen && "rotate-180"} />
      {isModalOpen && (
        <>
          <ul className="absolute top-[21px] right-[4px] rounded-[5px] flex flex-col text-[12px] bg-white text-center shadow-md list-none"
            onClick={(e) => e.stopPropagation()}>
            {[...sortName.keys()].map((key) => {
              return <li
              key={key} 
              className={`py-[4px] px-[16px] bg-white cursor-pointer hover:bg-[#f7f9fa] ${sortby === key ? "text-[--blue-100]" : "text-[--black-200]"}`}
              >{sortName.get(key)}</li>
            })}
          </ul>
        </>
      )}
    </button>
  )
}

export default SortbyModalWindow;