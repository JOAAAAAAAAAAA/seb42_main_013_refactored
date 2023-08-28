import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signupSchema, signupData } from '@/zodSchema/signup';
import CustomInput from './CustomInput';



export default function SignupForm() {


  return(
    <div className="container">
      <CustomInput type="text" placeholder="이메일" />
            {/* <LoginBox onSubmit={handleSubmit(onSubmit, onError)}>
        <Errorspan>{errors.email && errors.email.message}</Errorspan>
        <FakeInput isFocus={isFocus1} isValid={errors.email?false:true}>
          <RealInput onFocus={() => setIsFocus1(true)} type="text" data={data} setData={setData} autoComplete="off" id="email" placeholder="이메일" name="email"
            {...register("email", {
              required: "이메일을 입력해 주세요.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                message: "이메일 형식이 아닙니다."
              }
            })} onBlur={() => setIsFocus1(false)} />
        </FakeInput>
        <Errorspan>{errors.displayName && errors.displayName.message}</Errorspan>
        <FakeInput isFocus={isFocus2} isValid={errors.displayName?false:true}>
          <RealInput onFocus={() => setIsFocus2(true)} type="text" data={data} setData={setData} autoComplete="off" id="displayName" placeholder="닉네임" minlength="4"
            {...register("displayName", {
              required: "닉네임을 입력해 주세요.",
              minLength: {
                value: 4,
                message: "닉네임은 최소 4글자 이상이어야 합니다."
              }
            })} onBlur={() => setIsFocus2(false)}/>
        </FakeInput>
        <Errorspan>{errors.password && errors.password.message}</Errorspan>
        <FakeInput isFocus={isFocus3} isValid={errors.password?false:true}>
          <RealInput onFocus={() => setIsFocus3(true)} type="password" data={data} setData={setData} autoComplete="off" id="password" placeholder="비밀번호" minlength="6"
            {...register("password", {
              required: "비밀번호를 입력해 주세요.",
              minLength: {
                value: 6,
                message: "password must be longer than 6 characters."
              }
            })} onBlur={() => setIsFocus3(false)}/>
        </FakeInput>
        <CurrentBtn>회원가입</CurrentBtn>
        <div>계정이 있으신가요?<Link to='/login' style={{color: "var(--blue-100)"}}>로그인</Link></div>
      </LoginBox> */}
    </div>
  )
}