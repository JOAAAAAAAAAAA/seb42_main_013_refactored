"use client"
import { Chip } from "@mui/material";
import OthersSVGSprite from "../OthersSVGSprite";
import PillSVGSprite from "../PillSVGSprite";
import { useReducer, useState } from "react";
import { BlueButton } from "@/app/components/Buttons";
import { experimental_useFormState as useFormState } from 'react-dom'
// import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { createData } from "@/lib/data";
import CreateModal from "./CreateModal";
import CreateInput from "./CreateInput";
import RadioChip from "./RadioChip";
import { Pill, PillData } from "@/types";
import AddButton from "./AddButton";
import Fieldset from "./Fieldset";
import SubmitButton from "./SubmitButton";

export type ModalState = Pick<Pill, 'expirationDate' | 'takingTime' | 'ingredients'>;
export type ModalAction =
  // | { type: "expirationDate_year"; year: number }
  // | { type: "expirationDate_month"; month: number }
  // | { type: "expirationDate_day"; day: number }
  | { type: "AddTakingTime"; time: string | undefined }
  | { type: "DeleteTakingTime"; time: string }
  | { type: "AddIngredients"; ingredient: string | undefined }
  | { type: "DeleteIngredients"; ingredient: string }

const modalReducer = (state: ModalState, action: ModalAction) => {
  switch (action.type) {
    // case "expirationDate_year":
    //   if (!state.expirationDate) {
    //     let date = new Date()
    //     date.setFullYear(action.year)
    //     return { ...state, expirationDate: date }
    //   } else {
    //     state.expirationDate.setFullYear(action.year)
    //     return { ...state }
    //   }
    // case "expirationDate_month":
    //   if (!state.expirationDate) {
    //     let date = new Date()
    //     date.setMonth(action.month - 1)
    //     return { ...state, expirationDate: date }
    //   } else {
    //     state.expirationDate.setMonth(action.month - 1)
    //     return { ...state }
    //   }
    // case "expirationDate_day":
    //   if (!state.expirationDate) {
    //     let date = new Date()
    //     date.setDate(action.day)
    //     return { ...state, expirationDate: date }
    //   } else {
    //     state.expirationDate.setDate(action.day)
    //     return { ...state }
    //   }
    case "AddTakingTime":
      if (!action.time) return state
      return { ...state, takingTime: [...state.takingTime, action.time] };
    case "DeleteTakingTime":
      return { ...state, takingTime: state.takingTime.filter((ele) => ele !== action.time) };
    case "AddIngredients":
      if (!action.ingredient) return state
      return { ...state, ingredients: [...state.ingredients, action.ingredient] };
    case "DeleteIngredients":
      return { ...state, ingredients: state.ingredients.filter((ele) => ele !== action.ingredient) };
    default:
      return state;
  }
}

export default function Create({
  searchParams
}: {
  searchParams: Record<string, string> | null
}) {
  const [modalState, dispatch] = useReducer(modalReducer, {
    expirationDate: null,
    takingTime: [],
    ingredients: [],
  })
  const today = new Date().toISOString().slice(0, 10)
  const showModal = searchParams?.modal
  // const boundCreateData = createData.bind(null,modalState);
  const [state, formAction] = useFormState(createData, {
    supplementName: '',
    ingredients: [],
    productType: '',
    formulation: '',
    expirationDate: null,
    startDate: today,
    endDate: null,
    takingTime: [],
    pillsLeft: 0,
    totalCapacity: 1,
    servingSize: 1,
  })
  // const { pending, data } = useFormStatus()

  console.log('state!!!!!!', state)
  return (
    <section className="main">
      <form
        className="container flex h-full flex-col gap-[--gap-md] !font-nanumGothic" noValidate
        action={formAction}
      // onSubmit 은 event handler
      // https://stackoverflow.com/questions/29014570/a-forms-action-and-onsubmit-which-executes-first
      // onKeyPress={(e) => { e.key === "Enter" &&ee e.preventDefault() }}
      >
        <CreateInput
          type="text"
          id="supplementName"
          name="supplementName"
          label="제품명"
        />
        <Fieldset fieldsetName="제품 유형">
          <RadioChip
            label="처방약"
            name="productType"
            id="drug"
            icon={<OthersSVGSprite id="drug" width="1.2em" color="currentColor" height="1.2em" />}
          />
          <RadioChip
            label="영양제"
            name="productType"
            id="supplement"
            icon={<OthersSVGSprite id="supplement" width="1.2em" color="currentColor" height="1.2em" />}
          />
        </Fieldset>
        <Fieldset fieldsetName="제형">
          <RadioChip
            name="formulation"
            label="캡슐"
            id="capsule"
            icon={<PillSVGSprite id="capsule" width="1.2em" color="currentColor" height="1.2em" />}
          />
          <RadioChip
            name="formulation"
            label="젤리"
            id="gummy"
            icon={<PillSVGSprite id="gummy" width="1.2em" color="currentColor" height="1.2em" />}
          />
          <RadioChip
            name="formulation"
            label="츄어블"
            id="chewable"
            icon={<PillSVGSprite id="chewable" width="1.2em" color="currentColor" height="1.2em" />}
          />
          <RadioChip
            name="formulation"
            label="분말"
            id="powder"
            icon={<PillSVGSprite id="powder" width="1.2em" color="currentColor" height="1.2em" />}
          />
          <RadioChip
            name="formulation"
            label="액상"
            id="liquid"
            icon={<PillSVGSprite id="liquid" width="1.2em" color="currentColor" height="1.2em" />}
          />
        </Fieldset>
        <Fieldset fieldsetName="주요 성분">
          {modalState.ingredients.map((name) => (
            // bind 함수로 대체
            // <label key={name} htmlFor={name}>
            <Chip
              key={name}
              label={name}
              size="small"
              variant="outlined"
              color="primary"
              onDelete={(e) => {
                dispatch({ type: "DeleteIngredients", ingredient: name })
              }}
            />
            //   <input type="checkbox" name="ingredients" id={name} value={name}
            //     checked readOnly className="peer appearance-none" />
            // </label>
          ))}
          <AddButton fieldset="ingredients" />
        </Fieldset>
        <Fieldset fieldsetName="소비기한">
          <CreateInput
            type="text"
            placeholder="YYYY"
            id="expirationDate_year"
            name="expirationDate_year"
            // onChange={(e) => {
            //   dispatch({ type: "expirationDate_year", year: parseInt(e.target.value) })
            // }}
            inputProps={{ maxLength: 4 }}
          />/
          <CreateInput
            type="text"
            placeholder="MM"
            id="expirationDate_month"
            name="expirationDate_month"
            // onChange={(e) => {
            //   dispatch({ type: "expirationDate_month", month: parseInt(e.target.value) })
            // }}
            inputProps={{ maxLength: 2 }}
          />/
          <CreateInput
            type="text"
            placeholder="DD"
            id="expirationDate_day"
            name="expirationDate_day"
            // onChange={(e) => {
            //   dispatch({ type: "expirationDate_day", day: parseInt(e.target.value) })
            // }}
            inputProps={{ maxLength: 2 }}
          />
        </Fieldset>
        <Fieldset fieldsetName="용량">
          <CreateInput
            type="number"
            id="pillsLeft"
            name="pillsLeft"
            label="잔여알수"
          />/
          <CreateInput
            type="number"
            id="totalCapacity"
            name="totalCapacity"
            label="전체용량"
          />
        </Fieldset>
        <Fieldset fieldsetName="복용 기간">
          <CreateInput
            type="date"
            id="startDate"
            name="startDate"
            defaultValue={today}
            required
            label="시작일"
          />~
          <CreateInput
            type="date"
            id="endDate"
            name="endDate"
            required
            label="종료일"
          />
        </Fieldset>
        <Fieldset fieldsetName="복용 시간">
          {modalState.takingTime.map((time) => (
            // <label key={time} htmlFor={time}>
            <Chip
              key={time}
              label={time}
              size="small"
              variant="outlined"
              color="primary"
              onDelete={() => {
                dispatch({ type: "DeleteTakingTime", time: time })
              }}
            />
            //     bind로 전송
            //     <input type="checkbox" name="takingTime" id={time} value={time}
            //       checked readOnly className="peer appearance-none" />
            // </label>
          ))}
          <AddButton fieldset="takingTime" />
        </Fieldset>
        <CreateInput
          type="number"
          id="servingSize"
          name="servingSize"
          label="1회 복용량"
        />
        <input type="text" id="csrf" value="" hidden />
        <SubmitButton>등록하기</SubmitButton>
      </form >
      {showModal && <CreateModal fieldName={showModal} formAction={formAction} />}

    </section>
  )
}