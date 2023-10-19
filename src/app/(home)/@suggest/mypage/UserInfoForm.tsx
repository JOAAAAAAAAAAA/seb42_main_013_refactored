
import Button from "@mui/material/Button"
import { updateUserConcerns } from "@/lib/user"
import CheckChip from "@/app/components/CheckChip"
import { getHealthData } from "@/lib/health"
import { AuthUser } from "@/types"

export default async function UserInfoForm({ authUser }: { authUser: AuthUser }) {
  async function create(formData: FormData) {
    'use server'

    // mutate data
    // revalidate cache
  }
  const health = await getHealthData()
  const updateWithUserInfo = updateUserConcerns.bind(null, authUser)

  return (
    <form 
    className="flex flex-col gap-[8px]"
    action={updateWithUserInfo}>
      <span className="ml-[8px] text-[16px] font-bold">최근 건강 고민을 선택해주세요.</span>
      <div className="flex w-full flex-wrap items-end gap-[--gap-sm] text-center">
        {health?.map((item) => {
          return (
            <CheckChip
              key={item.id}
              id={item.title}
              label={item.title}
              name="concerns"
            />
          )
        })}
      </div>
      <Button variant="outlined" type="submit">저장</Button>
    </form>
  )
}