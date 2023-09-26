export default function Create(){

  return (
    <DataCreateContainer noValidate onSubmit={submitHandler} onKeyPress={(e)=>{e.key==="Enter" && e.preventDefault()}}>
      <InputSection>
        <h3>종류</h3>
        <div>
          <OptionTag
            nobtn={1}
            notselected={data.supplementType !== "supplement"}
            onClick={() => {
              setData({ ...data, supplementType: "supplement" });
            }}
          >
            영양제
            <AddBtn type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"></path>
                <path d="m8.5 8.5 7 7"></path>
              </svg>
            </AddBtn>
          </OptionTag>
          <OptionTag
            nobtn={1}
            notselected={data.supplementType !== "drug"}
            onClick={() => {
              setData({ ...data, supplementType: "drug" });
            }}
          >
            처방약
            <AddBtn type="button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <circle cx="7" cy="7" r="5"></circle>
                <circle cx="17" cy="17" r="5"></circle>
                <path d="M12 17h10"></path>
                <path d="m3.46 10.54 7.08-7.08"></path>
              </svg>
            </AddBtn>
          </OptionTag>
        </div>
      </InputSection>
      <InputSection>
        <h3>이미지</h3>
        <SelectImg data={data} setData={setData}/>
      </InputSection>
      <InputSection>
        <h3>
          약 이름<p>*</p>
        </h3>
        <div>
          <DataInput required={1} type="text" data={data} setData={setData} name="supplementName" />
        </div>
      </InputSection>
      <InputSection>
        <h3>주요 성분</h3>
        <div>
          {data.nutrients &&
            data.nutrients.map((ele, idx) => {
              return <Tags key={idx} ele={ele} idx={idx} deleteEleHandler={deleteEleHandler} name="nutrients" />;
            })}
          <AddBtn type="button"
            onClick={() => {
              setWhichData("nutrients");
              openeModalHandler();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </AddBtn>
        </div>
      </InputSection>
      <InputSection>
        <h3>소비기한</h3>
        <div>
          <DataInput type="date" data={data} setData={setData} name="expirationDate" />
        </div>
      </InputSection>
      <InputSection>
        <h3>
          잔여알수 / 전체용량<p>*</p>
        </h3>
        <Box>
          <DataInput max={data.totalCapacity} placeholder="잔여알수" required={1} type="number" name="pillsLeft" data={data} setData={setData} />
          /
          <DataInput placeholder="전체용량" required={1} type="number" name="totalCapacity" data={data} setData={setData} />
        </Box>
      </InputSection>
      <InputSection>
        <h3>복용 기간</h3>
        <div>
          <DataInput required={1} placeholder="시작일" type="date" name="startDate" data={data} setData={setData} />
          ~
          <DataInput min={data.startDate} placeholder="종료일" type="date" name="endDate" data={data} setData={setData} />
        </div>
      </InputSection>
      <InputSection>
        <h3>
          복용 주기<p>*</p>
        </h3>
        <div>
          <Cycle className="everyday" selected={data.dosageInterval === "1" ? 1 : 0} onClick={() => setData({ ...data, dosageInterval: "1" })}>
            <span>매일</span>
          </Cycle>
          <Cycle className="ndays" selected={data.dosageInterval !== "1" ? 1 : 0} onClick={openEditHandler} isEditMode={isEditMode}>
            {isEditMode && (
              <>
                <RealInput
                  type="number"
                  value={data.dosageInterval}
                  ref={inputEl}
                  onBlur={blurHandler}
                  onChange={cycleHandler}
                  placeholder="며칠마다 복용하시나요"
                />
                <DeleteBtn value={1}>
                  <button type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                </DeleteBtn>
              </>
            )}
            {!isEditMode && <span>{data.dosageInterval === "1" ? "N" : data.dosageInterval}일</span>}
          </Cycle>
        </div>
      </InputSection>
      <InputSection>
        <h3>복용 시간</h3>
        <div>
          {data.takingTime &&
            data.takingTime.map((ele, idx) => {
              return <Tags key={idx} ele={ele} idx={idx} deleteEleHandler={deleteEleHandler} name="takingTime" />;
            })}
          <AddBtn type="button"
            onClick={() => {
              setWhichData("takingTime");
              openeModalHandler();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </AddBtn>
        </div>
      </InputSection>
      <InputSection>
        <h3>
          1회 복용량<p>*</p>
        </h3>
        <div>
          <DataInput required={1} min={1} placeholder="1회 복용량" type="number" name="dosagePerServing" data={data} setData={setData} />
        </div>
      </InputSection>
      <ScanBarcode
        type="button"
        onClick={() => {
          setWhichData("barcode");
          openeModalHandler();
        }}
      >
        <svg version="1.1" viewBox="0 0 700 550" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m117.6 126c0-12.371 10.031-22.398 22.398-22.398h56v-22.398h-56c-24.742 0-44.801 20.059-44.801 44.801v56h22.398zm0 313.6v-56h-22.398v56c0 24.742 20.059 44.801 44.801 44.801h56v-22.398h-56c-12.375-0.003906-22.402-10.035-22.402-22.402zm470.4 0c0 12.371-10.031 22.398-22.398 22.398h-56v22.398h56c24.742 0 44.801-20.059 44.801-44.801v-56h-22.398zm-22.398-358.4h-56v22.398h56c12.371 0 22.398 10.031 22.398 22.398v56h22.398v-56c0-24.738-20.059-44.797-44.797-44.797zm-448 201.6c0 6.1836 5.0195 11.199 11.199 11.199h448c6.1836 0 11.199-5.0195 11.199-11.199 0-6.1836-5.0195-11.199-11.199-11.199h-448c-6.1836 0-11.199 5.0156-11.199 11.199zm179.2-134.4h-22.398v100.8h22.398zm-134.4 0v100.8h22.398v-100.8zm179.2 0h-22.398v100.8h22.398zm112 0h-22.398v100.8h22.398zm44.797 0h-22.398v100.8h22.398zm22.402 0v100.8h22.398v-100.8zm-268.8 0h-44.801v100.8h44.801zm156.8 0h-44.801v100.8h44.801zm-134.4 268.8h22.398v-100.8h-22.398zm-89.598 0v-100.8h-22.398v100.8zm134.4 0h22.398v-100.8h-22.398zm112 0h22.398v-100.8h-22.398zm44.801 0h22.398v-100.8h-22.398zm67.199 0v-100.8h-22.398v100.8zm-336 0h44.801v-100.8h-44.801zm156.8 0h44.801v-100.8h-44.801z"
          />
        </svg>
      </ScanBarcode>
      {data.isPatch 
      ?<CurrentBtn>수정하기</CurrentBtn> 
      :<CurrentBtn>등록하기</CurrentBtn>
      }
      {isOpen && <CreateModal name={whichData} isOpen={isOpen} openModalHandler={openeModalHandler} data={data} setData={setData} />}
    </DataCreateContainer>
  )
}