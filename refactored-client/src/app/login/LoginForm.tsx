"use client"
import { BlueButton } from "@/app/components/Buttons";
import FormInput from "@/app/components/FormInput";
import { loginData } from "@/types";
import { loginSchema } from "@/zodSchema/login";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";


export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isValid, isDirty, isSubmitting } } = useForm<loginData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (data: loginData) => {
    //   await axios({
    //     method: 'post',
    //     url: `${process.env.REACT_APP_API_URL}/auth/login`,
    //     params: {},
    //     data: data,
    //   }, { withCredentials: true })

    //     .then(async (res) => {
    //       sessionStorage.setItem('Authorization', res.headers["authorization"])
    //       getUserInfo()

    //         .then((res) => {
    //           if (res.response?.status === 500) {
    //             alert("필수 정보를 입력해 주세요!");
    //             window.location.href = "/setuserinfo";
    //           } else {
    //             const actions = {};
    //             if (res) {
    //               const newSup = res.supplements.sort(() => Math.random() - 0.5);
    //               actions.login = true;
    //               actions.userInfo = {...res, supplements: newSup};
    //               dispatch(loginInfoActions.changeLoginInfo(actions))
    //               window.location.href = '/suggest'
    //             }
    //           }
    //         })

    //     })
    //     .catch((err) => { alert('일치하는 회원정보가 없습니다'); console.log(err) })
  };
  // const onError = (error) => {
  //   console.log(error);
  // };


  // const { login } = useSelector(state => state.loginInfoReducer);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (login) {
  //     navigate("/suggest");
  //   }
  // }, [login])


  return (
    <form className="w-full [&>div>div]:py-[--gap-sm]" onSubmit={handleSubmit(onSubmit)}>
      <FormInput type="text" placeholder="이메일" error={errors?.email} register={register("email")} />
      <FormInput type="password" placeholder="비밀번호" error={errors?.password} register={register("password")} />
      <BlueButton type="submit">로그인</BlueButton>
      <div className="flex w-full items-center tracking-wide justify-center text-center text-[--black-300] mt-[22px]">계정이 없으신가요?<Link href="/signup" className="text-[--blue-100] ml-0.5">회원가입</Link></div>
    </form>
  )
}