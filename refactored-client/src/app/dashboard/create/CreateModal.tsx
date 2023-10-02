"use client"

import { BlueButton } from "@/app/components/Buttons";
import { Backdrop, Button, Modal, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useRef, Dispatch } from "react";
import { ModalAction, ModalState } from "./page"


export default function CreateModal({
  fieldName,
  dispatch,
}: {
  fieldName: string;
  dispatch: Dispatch<ModalAction>;
}) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <Backdrop
      className="z-10"
      open={true} onClick={(router.back)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative m-auto flex max-w-[300px] flex-col gap-[4px] rounded-[5px] bg-white px-[20px] py-[16px]">
        <TextField
          className="cleanInput !min-w-[150px]"
          sx={{
            '& .MuiFormLabel-asterisk,.MuiInputLabel-asterisk':{
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
        <Button
          variant="contained"
          onClick={() => {
            fieldName === "ingredients"
              ? dispatch({ type: "AddIngredients", ingredient: inputRef.current?.value })
              : dispatch({ type: "AddTakingTime", time: inputRef.current?.value })
            router.back()
          }}
        >추가</Button>
      </div>
    </Backdrop>
  )
}