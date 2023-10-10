"use client";

import { useState } from "react";
import { PillDataFilter} from "@/types.js";


export default function Tab() { 
  const [tab, setTab] = useState<PillDataFilter>("all");

  return (
    <form className="relative flex w-full justify-between gap-[16px] rounded-[24px] bg-[--black-500] p-[3px]
    [&>button]:z-10 [&>button]:flex-1 [&>button]:rounded-[21px] [&>button]:p-[4px] [&>button]:text-center [&>button]:text-[--black-300]
    ">
        <button 
        className={`z-10 flex-1 cursor-pointer rounded-[21px] p-[4px] text-center
          ${tab==="all" ?"text-[--black-200]" :"text-[--black-300]"} `} 
        onClick={() => setTab("all")}>
          종합
        </button>
        <div className={`z-10 flex-1 cursor-pointer
          rounded-[21px]
          p-[4px]
          text-center
          ${tab==="supplement" 
          ?"text-[--black-200]"
          :"text-[--black-300]"} 
          `} 
        onClick={() => setTab("supplement")}>
          영양제
        </div>
        <div className={`
        z-10
          flex-1 cursor-pointer
          rounded-[21px]
          p-[4px]
          text-center
          ${tab==="drug" 
          ?"text-[--black-200]"
          :"text-[--black-300]"} 
          `}  
        onClick={() => setTab("drug")}>
          처방약
        </div>
          <span className={`
            absolute left-[3px]
            z-0	
            h-[calc(100%-6px)] w-[calc((100%-36px)/3)] rounded-[21px] bg-white p-[4px] text-center shadow-md transition-transform
            ${tab==="supplement" && "translate-x-[calc(100%+16px)]"}
            ${tab==="drug" && "translate-x-[calc(200%+30px)]"}
            `}/>
      </form>
  )

}