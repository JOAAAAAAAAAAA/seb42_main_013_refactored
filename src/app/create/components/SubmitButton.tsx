import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button, SxProps } from '@mui/material';

export default function SubmitButton ({
  sx,
  children,
}: {
  sx?: SxProps
  children: React.ReactNode
}){
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending} sx={sx} variant="contained">{children}</Button>
  )
}