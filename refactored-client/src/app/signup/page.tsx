"use client";
// import DataInput, { FakeInput, RealInput, SocialBtn } from "../components/DataInput";
// import { useForm } from "react-hook-form";
// import { CurrentBtn } from "../styles/Buttons";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
import Image from 'next/image'
import CustomInput from '../components/CustomInput';
import SignupForm from '../components/SignupForm';


// const Title=({href})=>{
// return (
//   <div style={{display:"flex"}}>
//    <img src={href} alt="아이콘" width="40px"/>
//    <div style={{fontSize:"40px", fontFamily:"NanumBarunGothicBold", letterSpacing:"1px", marginLeft:"10px"}}>I Pill U</div>
//   </div>
// )
// }

// export const LoginBox = styled.form`
//   width: 100%;
//   >div{
//     padding-top: 8px;
//     padding-bottom: 8px;
//     margin-bottom: 16px;
//   }
//   >div:nth-last-child(1){
//     padding: 16px 0;
//   }
//   >div:last-child{
//     text-align: center;
//     color: var(--black-300);
//     span{
//       color: var(--blue-100)
//     }
//   }
// `;
// const Errorspan = styled.span`
//   color:red;  
//   font-size: 12px;
// `;

// const onClick=()=>{ window.location.href = '/login'};

function Signup() {
  // const { login } = useSelector(state => state.loginInfoReducer);
  // const navigate = useNavigate();
  // within 사용으로 필요 없음
  // const [isFocus1, setIsFocus1] = useState(false);
  // const [isFocus2, setIsFocus2] = useState(false);
  // const [isFocus3, setIsFocus3] = useState(false);

  

  // useEffect(() => {
  //   if(login) {
  //     navigate("/suggest");
  //   }
  // }, [login])

  return (
    <div className="container flex-col  px-9 h-full items-center justify-center gap-8">
      <div className="flex items-center justify-center"><Image src="/images/icon--ipu.png" alt="I PILL U logo" width={40} height={40}/><p className="text-3xl font-semibold tracking-wide ml-2.5">I Pill U</p></div>
      <div className="flex px-2	gap-6"><Image src="/images/btn_google_signin_light_normal_web@2x.png" alt="google icon" width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }}/></div>
        <SignupForm/>
      </div>
  )
}

export default Signup;