"use client"
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import PillSVGSprite from "./PillSVGSprite";
import { useState } from "react";
import OthersSVGSprite from "./OthersSVGSprite";


export default function DataList() {
  const [isOpen, setIsOpen] = useState(false);
  const openModalHandler = () => {
    setIsOpen(!isOpen);
  };
  const spreadPill = {
    detailSupplementId: 1,
    dosageInterval: 3,
    dosagePerServing: 1,
    endDate: '2023-01-01',
    expirationDate: '2023-11-01',
    pillsLeft: 3,
    startDate: '2023-01-01',
    supplementName: '오메가3',
    takingTime: ['3시'],
    totalCapacity: '50',
    supplementType: "supplement",
    nutrients: ["오메가3", "비타민D", "비타민E"],
  }


  // const isCloseToExpirationDate = new Date(spreadPill.expirationDate)-new Date()<=1000*60*60*24*30
  // const isAlmostRunout = spreadPill.pillsLeft<=10
  // const patchHandler = () => {
  //   dispatch(setCreateData(spreadPill))
  //   dispatch(setIDData(spreadPill))
  //   dispatch(setIsPatch())
  // }
  // const clickDeleteHandler = () => {
  //   openModalHandler()
  //   openDeleteHanlder()
  //   dispatch(setTargetId(spreadPill.detailSupplementId))
  // }
  

  // let imgGroups={group1:["capsule_plain","ellipse_half_white","rhombus_white","circle_white","omega3", "capsule_red","circle_brown","circle_yellow_1","circle_pink","omega3_2","circle_yellowgreen","capsule_brown","circle_small_yellow","circle_Mix_Pink","capsule_Orange","half_spot"],group2:["capsule_green","capsule_blue","ellipse_pink","ellipse_white","ellipse_half_yellow","rhombus_spot","ellipse_blue","capsule_black","half_circle"]}
  // const findImgSource = imgGroups.group1.includes(spreadPill.imageURL) ? "group1" : "group2"
  
  return (
    <li className="
    relative flex w-full rounded-[5px] px-[8px] py-[16px]
    shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
      {/* {isOpen && <ModalBackdrop className="backdrop" onClick={openModalHandler} />} */}
      <div className="relative mr-[8px] flex h-[66.5px] w-[92px] items-center justify-center pb-[5px]">
        <PillSVGSprite id="capsule" color="black" width="80px" height="80px" />
          <FontAwesomeIcon className="absolute bottom-[11px] left-[6px] w-[13px] text-[rgb(240,86,86)]" icon={faCircleExclamation} />
      </div>
      <div className="flex grow-[3] flex-col gap-[--gap-sm]">
        <div className="flex items-center gap-[4px] text-[14px] text-[--black-200]">
          <span className="text-center text-[16px] text-black">{spreadPill.supplementName}</span>
          <span className="text-center text-[14px] text-[--balck-200]">{spreadPill.nutrients[0]}</span>
        </div>
        <div className="flex gap-[4px] text-[14px] text-[--black-100]">
          <OthersSVGSprite id="calendar" color="black" width="16px" height="16px" />
          {spreadPill.dosageInterval === 1 ? "매일" : `${spreadPill.dosageInterval}일 마다`}
          {!!spreadPill.takingTime.length && (
              <OthersSVGSprite id="time" color="black" width="16px" height="16px" />
          )}
          {spreadPill.takingTime.map((ele, idx) => {
            return <span key={idx}>{ele}</span>;
          })}
          {spreadPill.supplementType === "drug" && (
            <OthersSVGSprite id="drug" color="black" width="16px" height="16px" />
          )}
          {spreadPill.supplementType === "supplement" && (
            <OthersSVGSprite id="supplement" color="black" width="16px" height="16px" />
          )}
          {`${spreadPill.dosagePerServing}알`}
        </div>
        {/* <PillSection pillsLeft={isAlmostRunout} expirationDate={isCloseToExpirationDate}>
          <span>남은 알 수</span>
          <span className="pillsLeft">{spreadPill.pillsLeft}</span>
          <span>{`/${spreadPill.totalCapacity}`}</span>
          {!!spreadPill.expirationDate.length &&
            <>
              <span>| 소비기한</span>
              <span className="expirationDate">{spreadPill.expirationDate}</span>
            </>

          }
        </PillSection> */}
      </div>
      {/* <OpenMenu onClick={openModalHandler}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="12" cy="5" r="1"></circle>
          <circle cx="12" cy="19" r="1"></circle>
        </svg>
      </OpenMenu> */}
      {/* {isOpen && (
        <>
          <ModalMenu onClick={(e) => e.stopPropagation()}>
            <ModalMenuLi><Link to="/datacreate" onClick={patchHandler}>수정하기</Link></ModalMenuLi>
            <ModalMenuLi onClick={clickDeleteHandler} className="delete">삭제하기</ModalMenuLi>
          </ModalMenu>
        </>
      )} */}
    </li>
  )
}