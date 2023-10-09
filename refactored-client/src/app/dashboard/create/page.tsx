"use client"
import { Button, Chip, FormHelperText } from "@mui/material";
import { experimental_useFormState as useFormState } from 'react-dom'
import { createData } from "@/lib/formAction";
import CreateModal from "./CreateModal";
import CreateInput from "./CreateInput";
import RadioChip from "./RadioChip";
import AddButton from "./AddButton";
import Fieldset from "./Fieldset";
import SubmitButton from "./SubmitButton";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import OthersSVGSprite from "../OthersSVGSprite";
import PillSVGSprite from "../PillSVGSprite";
import { ZodIssueCode } from "zod";
import { FormState } from "@/types";
import SessionExpireModal from "@/app/components/SessionExpireModal";

export default function Create(
) {
  const today = new Date().toISOString().slice(0, 10)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const sessionExpire = searchParams.get('session')
  const showModal = searchParams.get('fieldset')
  const [formState, formAction] = useFormState<FormState, FormData>(createData, {
    supplementName: '',
    ingredients: [],
    productType: '',
    formulation: '',
    startDate: today,
    endDate: null,
    takingTime: [],
    pillsLeft: 0,
    totalCapacity: 1,
    servingSize: 1,
    errorMessage: {}
  })

  const deleteChip = async (fieldsetName: string, value: string) => {
    const formData = new FormData();
    formData.append("type", "deleteChip")
    formData.append("fieldsetName", fieldsetName)
    formData.append("value", value)
    //bind 한 후 호출해야 실행 됨
    // const boundFormAction = formAction.bind(null, formData)
    // boundFormAction();
    // bind 안해도 실행됨...?
    formAction(formData)
    router.push(pathname)
  }
  const addChip = async (e) => {
    e.preventDefault();
    const form = e.currentTarget
    const formData = new FormData(form)
    await formAction(formData)
    router.back()
  }



  return (
    <section className="main">
      <form
        className="container flex h-full flex-col justify-around gap-[--gap-sm] [&_*]:!font-nanumGothic	" 
        noValidate //css 용 valid 작동 안하게, validation은 zod로
        action={formAction}
      // onSubmit 은 event handler
      // https://stackoverflow.com/questions/29014570/a-forms-action-and-onsubmit-which-executes-first
      // onKeyPress={(e) => { e.key === "Enter" &&ee e.preventDefault() }}
      >
        <CreateInput
          label="제품명"
          error={!!formState?.errorMessage?.supplementName}
          helperText={formState?.errorMessage?.supplementName?.[0]?.message || " "}
          type="text"
          id="supplementName"
          name="supplementName"
        />
        <Fieldset fieldsetName="제품 유형"
          errorMessage={formState.errorMessage?.productType}>
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
        <Fieldset fieldsetName="제형"
          errorMessage={formState.errorMessage.formulation}>
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
        <Fieldset fieldsetName="주요 성분"
          errorMessage={formState.errorMessage.ingredients}>
          {formState.ingredients.map((name, idx) => (
            // bind 함수로 대체
            
            <label key={idx} htmlFor={name}>
              <Chip
                label={name}
                size="small"
                variant="outlined"
                color="primary"
                onDelete={() => {
                  deleteChip('ingredients',name)
                }}
              />
              <input type="checkbox" name="ingredients" id={name} value={name}
                checked readOnly hidden className="peer" />
            </label>
          ))}
          <AddButton fieldset="ingredients" />
        </Fieldset>
        <Fieldset fieldsetName="제품 용량"
          errorMessage={
            (!formState.errorMessage.pillsLeft && !formState.errorMessage.totalCapacity)
            ? undefined
            :[
            ...(formState.errorMessage.pillsLeft ?? []),
            ...(formState.errorMessage.totalCapacity ?? [])
          ]}>
          <CreateInput
            type="number"
            id="pillsLeft"
            name="pillsLeft"
            label="잔여알수"
            error={!!formState.errorMessage?.pillsLeft}
          /><p className="inline-block">/</p>
          <CreateInput
            type="number"
            id="totalCapacity"
            name="totalCapacity"
            label="전체용량"
            error={!!formState.errorMessage?.totalCapacity}
          />
        </Fieldset>

        <Fieldset fieldsetName="복용 기간">
          <CreateInput
            type="date"
            id="startDate"
            name="startDate"
            defaultValue={today}
            required
            error={!!formState.errorMessage?.startDate}
            helperText={formState.errorMessage?.startDate?.[0]?.message}
            label="시작일"
          />~
          <CreateInput
            type="date"
            id="endDate"
            name="endDate"
            required
            error={!!formState.errorMessage?.endDate}
            helperText={formState.errorMessage?.endDate?.[0]?.message}
            label="종료일"
          />
        </Fieldset>
        <Fieldset fieldsetName="복용 시간"
          errorMessage={formState.errorMessage.takingTime}>
          {formState.takingTime.map((time, idx) => (
            <label key={time} htmlFor={time}>
              <Chip
                key={idx}
                label={time}
                size="small"
                variant="outlined"
                color="primary"
                onDelete={() => {
                  deleteChip("takingTime", time)
                }}
              />
              <input type="checkbox" name="takingTime" id={time} value={time}
                checked readOnly className="peer appearance-none" />
            </label>
          ))}
          <AddButton fieldset="takingTime" />
        </Fieldset>
        <CreateInput
          label="1회 복용량"
          defaultValue={1}
          type="number"
          id="servingSize"
          name="servingSize"
          error={!!formState.errorMessage?.servingSize}
          helperText={formState.errorMessage?.servingSize?.[0]?.message || " "}
        />
        {/* <input type="text" id="csrf" value="" hidden /> */}
        <input name="type" type="hidden" defaultValue="create" />
        <SubmitButton>등록하기</SubmitButton>
      </form >
      {showModal && <CreateModal addChip={addChip} />}
      {sessionExpire && <SessionExpireModal /> }
    </section>
  )
}