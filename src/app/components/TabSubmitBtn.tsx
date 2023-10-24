import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button, CircularProgress } from '@mui/material';
import TabScrollButton, { TabScrollButtonProps } from '@mui/material/TabScrollButton';

interface customTabScrollButtonProps extends TabScrollButtonProps {
  onClick: () => void
}

export default function TabSubmitBtn(props: customTabScrollButtonProps) {
  const { pending } = useFormStatus()
  const { onClick, direction, ...other } = props;
  return (
    <button type="submit" 
    className='inline-flex h-full w-[40px] items-center justify-center'
    disabled={pending||direction==="left"}>
      {pending 
      ? <CircularProgress size={24}/>
      : <TabScrollButton {...props}/>
      }
    </button>
  )
}