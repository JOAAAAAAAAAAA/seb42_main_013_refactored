import styled from "styled-components";
import { faTimes, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";
import CreateModal from "../components/CreateModal";
import Swiper from "../components/Swiper";
import DataInput from "../components/DataInput";


const DataCreateContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 48px - 64px);
  flex-direction: column;
  justify-content: space-around;
  padding: 0px 20px 40px;
  background-color: white;
  --border : #B0B0B0 solid 1px;
  --border-radius: 5px;
  --component-height: 25px;

`

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
  >h3{
    font-family: 'NanumBarunGothicBold';
    color: #666666;
    font-size: 16px;
    margin-bottom: 8px;
    display: flex;
    gap: 2px;
  }
  p{
    font-size: 14px;
    font-weight: 700;
    color: var(--blue-100);
    display: block;
  }
  >div{
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    width: 100%;
    line-height: 100%;
    align-items: center;
  }
`
export const OptionTag = styled.button`
  display: flex;
  align-items: center;
  height: var(--component-height);
  /* line-height: var(--component-height); */
  border-width: 0;
  border-radius: 30px;
  padding: 10px;
  text-align: center;
  color : ${(props) => props.selected ? "white" : "#666666"};
  background-color: ${(props) => props.selected ? "var(--blue-100)" : "#D9D9D9"};
  font-size: 12px;
  button{
    margin-left: 7px;
    margin-right: 2px;
    height: var(--component-height);
    width: auto;
    background-color: transparent;
    border: none;
    color: ${(props) => props.selected ? "white" : "#666666"};
  }
`
const Box=styled.div`
  display: inline-block;
`


export const AddBtn = styled.button`
  color: white;
  background-color: var(--blue-100);
  border: none;
  width: var(--component-height);;
  height: var(--component-height);
  border-radius: 50%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
`


function DataCrete() {
  const [isOpen, setIsoOpen] = useState(false)
  const openContainsModalHandler = () => {
    setIsoOpen(!isOpen)
  }

  const [data, setData] = useState(
    {
      type: "supplement",
      img: null,
      name: "",
      contains: [{}],
      expiryDate: null,
      currentQty: null,
      totalQty: null,
      startDate: null,
      endDate: null,
      cycle: 1,
      time:[],
      dose:1,
    }
  )


  return(
    <DataCreateContainer>
      <InputSection>
        <h3>종류</h3>
        <div>
          <OptionTag selected={1}>영양제</OptionTag>
          <OptionTag>처방약</OptionTag>
        </div>
      </InputSection>
      <InputSection>
        <h3>이미지</h3>
        <Swiper />
      </InputSection>
      <InputSection>
        <h3>약 이름<p>*</p></h3>
        <div>
          <DataInput type="text" handler={(e)=>setData({...data,name:e.target.value})}/>
        </div>
      </InputSection>
      <InputSection>
        <h3>주요 성분</h3>
        <div>
          <OptionTag selected={1}>아티초크 150mg</OptionTag>
          <AddBtn onClick={openContainsModalHandler}><FontAwesomeIcon icon={faPlus}/></AddBtn>
        </div>
      </InputSection>
      <InputSection>
        <h3>소비기한</h3>
        <div>
         <DataInput type="date" handler={(e)=>setData({...data,expiryDate:e.target.value})}/>
        </div>
      </InputSection>
      <InputSection>
        <h3>잔여알수 / 전체용량</h3>
        <Box>
          <DataInput type="number" value={data.currentQty} handler={(e)=>setData({...data,currentQty:e.target.value})} />
          /
          <DataInput type="number" value={data.totalQty} handler={(e)=>setData({...data,totalQty:e.target.value})}/> 
        </Box>
      </InputSection>
      <InputSection>
        <h3>복용 기간</h3>
        <div>
          <DataInput type="date" handler={(e)=>setData({...data,startDate:e.target.value})}/>
          ~
          <DataInput type="date" handler={(e)=>setData({...data,endDate:e.target.value})}/>
        </div>
      </InputSection>
      <InputSection>
        <h3>복용 주기<p>*</p></h3>
        <div>
          <OptionTag selected={1}>매일</OptionTag>
          <OptionTag>N일</OptionTag>
        </div>
      </InputSection>
      <InputSection>
        <h3>복용 시간</h3>
        <div>
          <OptionTag selected={1}>오전 9시<button><FontAwesomeIcon icon={faTimes}/></button></OptionTag>
          <AddBtn><FontAwesomeIcon icon={faPlus}/></AddBtn>
        </div>
      </InputSection>
      <InputSection>
        <h3>복용량<p>*</p></h3>
        <div>
        <AddBtn><FontAwesomeIcon icon={faMinus}/></AddBtn>
        2 알
        <AddBtn><FontAwesomeIcon icon={faPlus}/></AddBtn>
        </div>
      </InputSection>
      {isOpen &&  <CreateModal isOpen={isOpen} openContainsModalHandler={openContainsModalHandler} data={data} setData={setData}/>}
    </DataCreateContainer >    
  )
}

export default DataCrete;
