"use client"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import OthersSVGSprite from "@/app/components/OthersSVGSprite";
import { PillData } from "@/types";
import Link from "next/link";
import { deletePill } from "@/lib/pills";
import { Backdrop } from "@mui/material";
import PillSVGSprite from "@/app/components/PillSVGSprite";

export default function DataList({ 
  pill,
  deleteOptimisticData }:{ 
  pill: PillData, 
  deleteOptimisticData: (action: unknown) => void }){

  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => setIsOpen(!isOpen);

  return (
    <li className="
    relative flex w-full rounded-[5px] px-[8px] py-[16px]
    shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      <div className="relative mr-[8px] flex h-[66.5px] w-[92px] flex-none items-center justify-center pb-[5px]">
        <PillSVGSprite id="capsule" color="black" width="80px" height="80px" />
        <FontAwesomeIcon className="absolute bottom-[11px] left-[6px] w-[13px] text-[rgb(240,86,86)]" icon={faCircleExclamation} />
      </div>
      <div className="flex flex-auto flex-col gap-[--gap-sm] overflow-hidden">
        <div className="flex max-w-[80%] items-center gap-[4px] text-[14px] text-[--black-200]">
          <span className="text-center text-[16px] text-black">{pill.supplementName}</span>
          <span className="truncate text-center	 text-[14px] text-[--balck-200]">{pill.ingredients?.join(", ")}</span>
        </div>
        <div className="flex items-center gap-[5px] text-center text-[14px] text-[--black-100]
        [&>span]:flex [&>span]:items-center [&>span]:gap-[2px] [&>span]:truncate
        ">
          {!!pill.takingTime.length && (
            <span>
              <OthersSVGSprite id="time" color="black" width="16px" height="16px" />
              {pill.takingTime.join(" ")}
            </span>
          )}
          {pill.productType === "supplement"
            ? (
              <span>
                <OthersSVGSprite id="supplement" color="black" width="16px" height="16px" />
                {`${pill.servingSize}알`}
              </span>
            )
            : (
              <span>
                <OthersSVGSprite id="drug" color="black" width="16px" height="16px" />
                {`${pill.servingSize}알`}
              </span>
            )}
        </div>
        <div className="flex items-center gap-[5px] text-center text-[14px]">
          <span>남은 알 수</span>
          <span
            className={pill.pillsLeft <= 3 ? "text-[rgb(240,86,86)]" : "text-[rgb(0,0,0)]"}
          >{pill.pillsLeft}</span>/
          <span>{pill.totalCapacity}</span>
          {/* {!!pill.expirationDate.length &&
            <>
              <span>| 소비기한</span>
              <span className="expirationDate">{spreadPill.expirationDate}</span>
            </>

          } */}
        </div>
      </div>
      <button 
      className="absolute right-[8px] top-[16px]"
      onClick={openModalHandler}>
        <OthersSVGSprite id="menu" color="black" width="18px" height="18px" />
      </button>
      {isOpen && (
        <>
          <ul 
          className="absolute right-[8px] top-[8px] z-10 flex cursor-pointer list-none flex-col rounded-[5px] bg-white text-center text-[12px] 
          shadow-[0px_4px_4px_rgba(0,0,0,0.25)] [&>:first-child]:pt-[8px] [&>:last-child]:pb-[8px] [&>li:active]:text-[--blue-100]
          [&>li:hover]:bg-[#f7f9fa] [&>li]:px-[16px] [&>li]:py-[4px]
          "
          onClick={(e) => e.stopPropagation()}>
            <li><Link href={`/create?edit=${pill.id}`}>수정하기</Link></li>
            <li onClick={()=> {
              deleteOptimisticData(pill.id)
              deletePill(pill.id)
            }}>삭제하기</li>
          </ul>
        </>
      )}
    </li>
  )
}
