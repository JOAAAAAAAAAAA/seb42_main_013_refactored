"use client"
import { Chip } from "@mui/material";
import { experimental_useFormState as useFormState } from 'react-dom'
import { createData } from "@/lib/formAction";
import CreateModal from "./CreateModal";
import CreateInput from "./CreateInput";
import RadioChip from "./RadioChip";
import { Pill } from "@/types";
import AddButton from "./AddButton";
import Fieldset from "./Fieldset";
import SubmitButton from "./SubmitButton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import OthersSVGSprite from "../OthersSVGSprite";
import PillSVGSprite from "../PillSVGSprite";
import { ZodIssueCode } from "zod";

interface FormState extends Pill {
  errorMessage: {
    [path in keyof Pill] ?: [{ message: string, errorCode: ZodIssueCode }]
  };
}

export default function Create(
) {
  const today = new Date().toISOString().slice(0, 10)
  const searchParams = useSearchParams()
  const router = useRouter()
  const showModal = searchParams.get('fieldset')
  const [formState, formAction] = useFormState<FormState, FormData>(createData, {
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
    errorMessage: {}
  })
  const deleteChip = async (fieldsetName: string, value: string) => {
    const formData = new FormData();
    formData.append("type", "deleteChip")
    formData.append("fieldsetName", fieldsetName)
    formData.append("value", value)
    //bind 한 후 호출해야 실행 됨
    const boundFormAction = formAction.bind(null, formData)
    boundFormAction();
  }
  const addChip = async (e) => {
    e.preventDefault();
    const form = e.currentTarget
    const formData = new FormData(form)
    //bind 한 후 호출해야 실행 됨
    const boundFormAction = formAction.bind(null, formData)
    await boundFormAction()
    router.back()
  }

  console.log(formState.errorMessage)
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
          error={!!formState.errorMessage?.supplementName}
          helperText={formState.errorMessage?.supplementName?.[0]?.message}
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
          {formState.ingredients.map((name, idx) => (
            // bind 함수로 대체
            <label key={idx} htmlFor={name}>
              <Chip
                label={name}
                size="small"
                variant="outlined"
                color="primary"
                onDelete={(e) => {
                  deleteChip("ingredients", name)
                }}
              />
              <input type="checkbox" name="ingredients" id={name} value={name}
                checked readOnly className="peer appearance-none" />
            </label>
          ))}
          <AddButton fieldset="ingredients" />
        </Fieldset>
        <Fieldset fieldsetName="소비기한">
          <CreateInput
            type="text"
            placeholder="YYYY"
            id="expirationDate_year"
            name="expirationDate_year"
            inputProps={{ maxLength: 4 }}
          />/
          <CreateInput
            type="text"
            placeholder="MM"
            id="expirationDate_month"
            name="expirationDate_month"
            inputProps={{ maxLength: 2 }}
          />/
          <CreateInput
            type="text"
            placeholder="DD"
            id="expirationDate_day"
            name="expirationDate_day"
            inputProps={{ maxLength: 2 }}
          />
        </Fieldset>
        <Fieldset fieldsetName="용량">
          <CreateInput
            type="number"
            id="pillsLeft"
            name="pillsLeft"
            label="잔여알수"
            error={!!formState.errorMessage?.pillsLeft}
            helperText={formState.errorMessage?.pillsLeft?.[0]?.message}
          /><p className="inline-block">/</p>
          <CreateInput
            type="number"
            id="totalCapacity"
            name="totalCapacity"
            label="전체용량"
            error={!!formState.errorMessage?.totalCapacity}
            helperText={formState.errorMessage?.totalCapacity?.[0]?.message}
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
        <Fieldset fieldsetName="복용 시간">
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
          type="number"
          id="servingSize"
          name="servingSize"
          label="1회 복용량"
          error={!!formState.errorMessage?.servingSize}
          helperText={formState.errorMessage?.servingSize?.[0]?.message}
        />
        {/* <input type="text" id="csrf" value="" hidden /> */}
        <input name="type" type="hidden" defaultValue="create" />
        <SubmitButton>등록하기</SubmitButton>
      </form >
      {showModal && <CreateModal addChip={addChip} />}
    </section>
  )
}