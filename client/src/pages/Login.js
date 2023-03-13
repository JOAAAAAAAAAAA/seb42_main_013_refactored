import { useState } from "react";
import styled from "styled-components";
import DataInput, { FakeInput, SocialBtn } from "../components/DataInput";
import { CurrentBtn } from "../styles/Buttons";
import { MypageConatiner } from "./MyPage";
import axios from "axios";


const LoginBox = styled.div`
  width: 100%;
  >div{
    padding-top: 8px;
    padding-bottom: 8px;
    margin-bottom: 16px;
    /* 여기가 인풋 css에요 */
  }
  >div:nth-last-child(2){
    padding: 16px 0;
  }
  >div:last-child{
    text-align: center;
    color: var(--black-300);
    span{
      color: var(--blue-100);
    }
  }
`
const OtherWayBox = styled.div`
  width: 100%;
  div{
    margin-bottom: 16px;
    padding: 16px 8px;
    color: var(--black-300)
  }
`
const Divider = styled.div`
  padding: 0;
  display: flex;
  ::after, ::before{
    content: "";
    width:100%;
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
    background-color: var(--black-400);
  }
`
const onClick=()=>{ window.location.href = '/login'}

const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        // width: "258px",
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "15px 5px 20px",
        fontSize: "13px",
        fontFamily: "NanumBarunGothicLight",
        color: "#949393",
        // fontWeight: "bold"
      }}
    >
      <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
    </div>
  );
};

function Login () {
  const [data, setData] = useState({email:'' ,password:''});
  // DataInput 컴포넌트 보시구 사용할 수 있는 props 확인해주세요
  // 1. input 의 e.target.value 를 data 객체에서 valu를 키 값으로 활용해 조회하게 설계하였습니다. e.g. data[id]
  // 2. type 도 props로 내려주시면 input 에 적용 됩니다.
  // 3. required 는 required={1} 이렇게 내려주시면 됩니다. CSS 는 구현하던 중이었는데 빨간색 테두리 뜨게 하려고 했습니다.
  // 추가로 필요한 css 있으시면, LoginBox styled속성안에 >div에서 입력하시면 적용됩니다. 위에 여기가 인풋이에요 라고 기재했습니다.
  // 혹시 invalid 속성 때문에 props 추가가 필요하시면 말씀해주세요 !

  const onSubmit = async (data) => {
    const URI = "";
    console.log(data);
    await axios({
        method: 'post',
        // url: `/auth/login`,
        url: `${URI}/auth/login`,
        params: {},
        data: data,
    }, { withCredentials: true })

        .then((res) => {
            console.log(res);
            // console.log(res.headers["authorization"])
            // axios.defaults.headers.common["Authorization"]=res.headers["authorization"];
            // sessionStorage.setItem('Authorization', res.headers["authorization"])
            // sessionStorage.setItem('email', data.username)
            alert('로그인 성공')
            window.location.href='/'

        })
        .catch((err) => { console.log(err) })
};

  return (
    <MypageConatiner>
      <h1>Welcome !</h1>
      <LoginBox onSubmit={onSubmit}>
        <DataInput type="text" data={data} setData={setData} value="email" placeholder="이메일" />
        <DataInput type="password" data={data} setData={setData} value="password" placeholder="비밀번호" />
        <CurrentBtn>로그인</CurrentBtn>
        <div>계정이 없으신가요 ?<span onClick={onClick} style={{cursor:"pointer"}}>회원가입</span></div>
      </LoginBox>
        <HorizonLine text="또는" />
      <OtherWayBox>
        {/* <Divider>OR</Divider> */}
        <SocialBtn name={'구글'} href="/images/icon--google.png" color="#3b4045"/>
        <SocialBtn name={'카카오'} href="/images/icon--kakao.png" bgcolor="#FEE500" color="#191919"/>
      </OtherWayBox>

    </MypageConatiner>
  )
}

export default Login;