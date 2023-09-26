"use client"
import { PillDataSort } from "@/types.js";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";



function SortbyModalWindow({
  // setIsModalOpen,
  // isModalOpen,
 }: {
    // setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    // isModalOpen: any;
  }) {

      const [sortby, setSortby] = useState<PillDataSort>("pillsLeftAscending");
    const [isModalOpen, setIsModalOpen] = useState(false);
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
    <button className="flex cursor-pointer items-center border-none bg-transparent text-[14px] text-[--black-100] outline-none"
      onClick={() => setIsModalOpen(!isModalOpen)}>
      <span>{sortName.get(sortby)}</span>
      <Image src="/svg/arrow.svg" alt="arrow" width={20} height={20} className={isModalOpen && "rotate-180"} />
      {isModalOpen && (
        <>
          <ul className="absolute right-[4px] top-[21px] flex list-none flex-col rounded-[5px] bg-white text-center text-[12px] shadow-md"
            onClick={(e) => e.stopPropagation()}>
            {[...sortName.keys()].map((key) => {
              return <li
              key={key} 
              className={`cursor-pointer bg-white px-[16px] py-[4px] hover:bg-[#f7f9fa] ${sortby === key ? "text-[--blue-100]" : "text-[--black-200]"}`}
              >{sortName.get(key)}</li>
            })}
          </ul>
        </>
      )}
    </button>
  )
}

export default SortbyModalWindow;