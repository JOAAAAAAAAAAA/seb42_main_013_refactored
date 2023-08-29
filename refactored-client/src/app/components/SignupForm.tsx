import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signupSchema, signupData } from '@/zodSchema/signup';
import FormInput from './FormInput';
import { BlueButton } from './Buttons';




export default function SignupForm() {
  const { register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting } } = useForm<signupData>({
    resolver: zodResolver(signupSchema),
  });
  // useForm 사용으로 필요 없음
  // const [data, setData] = useState({ email: '', password: '', displayName: '' });
  const onSubmit = async (data: signupData) => {
    console.log(isSubmitting)
    console.log(data);
    // await axios({
    //   method: 'post',
    //   // url: `/users`,
    //   // url: `${process.env.REACT_APP_API_URL}/users`,
    //   url: `http://ec2-3-35-105-108.ap-northeast-2.compute.amazonaws.com:8080/users`,
    //   params: {},
    //   data: data,
    // }, { withCredentials: true })

    //   .then((res) => {
    //     alert('회원가입 완료')
    //     window.location.href = '/signupDone'
    //     // console.log(res)
    //   })
    //   .catch((err) => { console.log(err) })
  };

  // const onError = (error) => {
  //   console.log(error);
  // };

  return (
    <form
      className="flex flex-col w-full [&>div>div]:py-[--gap-sm]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput type="text" placeholder="이메일" error={errors?.email}
        register={register("email")} />
      <FormInput type="text" placeholder="닉네임(2~12자)" error={errors?.displayName}
        register={register("displayName")} />
      <FormInput type="password" placeholder="비밀번호(8~32자리)" error={errors?.password} autocomplete="false"
        register={register("password")} />
      <FormInput type="password" placeholder="비밀번호 확인" error={errors?.confirmPassword} autocomplete="false"
        register={register("confirmPassword")} />
      <BlueButton type="submit" disabled={isSubmitting} >회원가입</BlueButton>
    </form>
  )
}