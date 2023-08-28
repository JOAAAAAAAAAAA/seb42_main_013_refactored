import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signupSchema, signupData } from '@/zodSchema/signup';
import FormInput from './FormInput';
import Link from 'next/link';
import { BlueButton } from './Buttons';




export default function SignupForm() {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<signupData>({
    resolver: zodResolver(signupSchema),
  });
  // useForm 사용으로 필요 없음
  // const [data, setData] = useState({ email: '', password: '', displayName: '' });
  const onSubmit = async (data:signupData) => {
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

  return(
    <form className="container"
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormInput type="text" placeholder="이메일" error={errors.email} 
      register={register("email",{
        required:"이메일을 입력해주세요.",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
          message: "이메일 형식이 아닙니다."
        }
        })}/>
      <FormInput type="text" placeholder="이메일" error={errors.email} 
      register={register("displayName", {
        required: "닉네임을 입력해 주세요.",
        minLength: {
          value: 4,
          message: "닉네임은 최소 4글자 이상이어야 합니다."
        }
      })}/>
      <FormInput type="text" placeholder="이메일" error={errors.email} 
      register={register("password", {
        required: "비밀번호를 입력해 주세요.",
        minLength: {
          value: 6,
          message: "password must be longer than 6 characters."
        }
      })}/>
        <BlueButton>회원가입</BlueButton>
        <div>계정이 있으신가요?<Link href="/login" >로그인</Link></div>
    </form>
  )
}