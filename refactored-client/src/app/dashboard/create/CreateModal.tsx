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
      className="z-10"
      open={true} onClick={()=>router.push(pathname)}>
      <div onClick={(e) => e.stopPropagation()}>
        <form
          // action={formAction} 
          //! revalidate & routerback처리 위해 custom onsubmit
          onSubmit={(e) => addChip(e)}
          className="relative m-auto flex max-w-[300px] flex-col gap-[4px] rounded-[5px] bg-white px-[20px] py-[16px]">
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
          <Button
            type="submit"
            variant="contained"
          >추가</Button>
        </form>
      </div>
    </Backdrop>
  )
}