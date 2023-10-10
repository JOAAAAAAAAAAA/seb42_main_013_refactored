"use client"

import { Backdrop, Button, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";


export default function CreateModal({
  addChip,
}: {
  addChip: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}) {
  const searchParams = useSearchParams()
  const fieldName = searchParams.get('fieldset') ?? ""
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname()

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
          className="m-auto flex max-w-[300px] flex-col gap-[4px] rounded-[5px] bg-white px-[20px] py-[16px]">
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
            <Button className="w-full" variant="outlined" onClick={() => router.push(pathname)}>취소</Button>
            <Button className="w-full" sx={{boxShadow:"none"}} type="submit" variant="contained">추가</Button>
          </div>
        </form>
      </div>
    </Backdrop>
  )
}