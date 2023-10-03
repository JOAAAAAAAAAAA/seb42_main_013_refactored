import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { BlueButton } from "@/app/components/Buttons";

export default function SubmitButton ({
  children,
}: {
  children: React.ReactNode
}){
  const { pending } = useFormStatus()

  return (
    <BlueButton type="submit" aria-disabled={pending}>{children}</BlueButton>
  )
}