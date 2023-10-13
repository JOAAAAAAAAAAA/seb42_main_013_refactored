
import { Button, Chip, Divider, IconButton, InputBase, Paper, Typography } from "@mui/material";
import { Suspense } from "react";
import { z } from "zod";
import UserConcern from "../../(home)/@suggest/UserConcern";
import { UserConcernSkeleton } from "../../(home)/@suggest/Skeletons";
import UserInfo from "../UserInfoForm";
import Card from "@mui/material/Card"
import Image from "next/image"
import Link from "next/link"
import { useContext } from "react"
import { AuthContext } from "@/context/AuthProvider"
import { getUserInServer } from "@/lib/user"
import CheckChip from "../../components/CheckChip";
import UserInfoForm from "../UserInfoForm";
import { getHealthData } from "@/lib/health";

export default async function Mypage({ params }: { params: { [key: string]: string | undefined } }) {
  const isEdit = params?.edit
  const authUser = await getUserInServer()

  return (
    <section className="main gap-[--gap-md] bg-[--black-500] px-0 pt-0 font-nanumGothic">
      <Paper square elevation={0} className="flex h-full flex-col  gap-[--gap-sm] px-[--gap-sm] py-[--gap-md]">
        <Card variant='outlined' className="flex w-full flex-col items-center justify-center gap-[8px] p-[--gap-md]">
          <Image priority src={authUser?.photoURL ?? 'https://source.boringavatars.com/beam'} alt="profile" width={100} height={100}
            className="rounded-full" />
          <div className="text-[18px] font-bold">{authUser?.displayName}</div>
          <div className="text-[14px]">{authUser?.email}</div>
          <div className="flex flex-wrap gap-[4px]">
          {authUser?.concerns?.map((item,idx) => {
            return(
              <Chip
              key={idx}
              label={item}
              color="primary"
              variant="outlined"/>
            )
          })}
          </div>
          <Divider variant="fullWidth" className="w-full" sx={{marginBottom:'16px'}} component="div"/>
          {!isEdit && <Button
            LinkComponent={Link}
            href={"/mypage/edit"}
            variant="outlined">건강 고민 수정</Button>}
          {isEdit && <UserInfoForm authUser={authUser} />}
        </Card>
      </Paper>
    </section>
  )
}