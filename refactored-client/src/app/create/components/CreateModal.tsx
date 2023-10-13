"use client"

import { Backdrop, Button, TextField } from "@mui/material";
import { revalidatePath } from "next/cache";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import SubmitButton from "./SubmitButton";


export default function CreateModal({
  addChip,
}: {
  addChip: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const searchParams = useSearchParams()
  const fieldName = searchParams.get('fieldset') ?? ""
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);
  const isEdit = searchParams.has('edit')
  const pathname = isEdit ? '/create?edit=' + searchParams.get('edit') : '/create'

  return (
    <Backdrop
      className="z-10 "
      open={true} onClick={() => router.push(pathname)}>
      <div
        className="[@media(min-width:1024px)]:ml-[420px]"
        onClick={(e) => e.stopPropagation()}>
        <form
          // action={formAction} 
          //! revalidate & routerback처리 위해 custom onsubmit
          onSubmit={(e) => addChip(e)}
          className="m-auto flex max-w-[300px] flex-col gap-[4px] rounded-[5px] bg-white p-[16px] px-[20px]">
          <TextField
            className="cleanInput !min-w-[150px]"
            sx={{
              '& .MuiFormLabel-asterisk,.MuiInputLabel-asterisk': {
                display: "none"
              },
            }}
            label={fieldName === "ingredients" ? "성분명" : "복용 시간"}
            type={fieldName === "ingredients" ? "text" : "time"}
            id={fieldName}
            required
            name={fieldName}
            inputRef={inputRef}
          />
          <input name="type" type="hidden" defaultValue={`update_${fieldName}`} />
          <div className="flex gap-[4px]">
            <Button className="w-full" variant="outlined" onClick={() => {
              router.push(pathname)
            }}>취소</Button>
            <SubmitButton sx={{ boxShadow: "none", width: "100%" }}>추가</SubmitButton>
          </div>
        </form>
      </div>
    </Backdrop>
  )
}