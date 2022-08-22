import { useRef, useState } from "react";
import styled from "styled-components";
import { AlertMessage, CommonBorder, CommonBtn, CommonForm, CommonInput, InfoTitle } from "../ui/styledSignUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { withdrawFetch } from "../../app/module/userSlice";

function WithdrawForm() {
  const [btnState, setBtnState] = useState(false);
  const [popUp, setPopUp] = useState({opacity:0, visibility:"hidden"});
  const checkboxRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const userState = useSelector(state => state.user)

  // popup error msg set
  useEffect(() => {
    if (userState.result === false) {
      setPopUp({opacity:1, visibility:"visible"})
      setTimeout(() => setPopUp({opacity: 0, visibility: "hidden"}), 1000)
    } else if (userState.result === true) {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('nickname');
      alert("그 동안 여기어때를 이용해주셔서 감사합니다.")
      window.location.assign('/')
    }
  },[userState])

  // check withdraw user setting
  function checkWithdrawSet() {
    if (checkboxRef.current.checked === false)
      return setBtnState(false)
    if (passwordRef.current.value === "" || passwordRef.current.value.length < 8)
      return setBtnState(false)
    else
      return setBtnState(true)
  }  

  // submit with password for withdraw user data
  function submitWithdrawUser(event) {
    event.preventDefault();
    if (btnState === false)
      return
    if (popUp.opacity === 1)
      return
    dispatch(withdrawFetch({password : passwordRef.current.value}));
  }

  // move to prev page
  function moveToMyPage () {
    window.location.assign('/mypage')
  }

  return (
    <WithdrawContainer>
      <h1 style={{textAlign: "center", fontSize:"24px", margin:"0 0 1rem 0" }}>회원탈퇴</h1>
      <ReasonSpace>
        <InfoTitle>왜 떠나시는지 <br /> <span>이유</span>가 있을까요?</InfoTitle>
        <ReasonTextArea placeholder="(선택사항) 서비스 이용 중 아쉬운 점에 대해 알려주세요. 고객님의 소리에 귀 기울일게요. 80자 이내" maxLength={80} />
      </ReasonSpace>
      <InfoSpace>
        <InfoTitle>이제 더 가시면.. <br /> <span>혜택이 영영 사라져요</span></InfoTitle>
        <InfoMessage>탈퇴하시면 지금껏 모으신 무료(무상) 포인트와 <br /> 쿠폰들이 사라져 복구가 불가해요.</InfoMessage>
        <InfoBox>
          <span>잔여 무료(무상) 포인트</span>
          <span style={{fontWeight:"700", color:"#eb4242", margin:"0 0.5rem"}}>0P</span>
          <span style={{color:"#eb4242", marginLeft:"auto"}}>즉시 소멸</span>
        </InfoBox>
        <InfoBox>
          <span>잔여 쿠폰</span>
          <span style={{fontWeight:"700", color:"#eb4242", margin:"0 0.5rem"}}>0</span>
          <span style={{color:"#eb4242", marginLeft:"auto"}}>즉시 소멸</span>
        </InfoBox>
        <InfoText>
          <li>무료(무상) 포인트는 숙박 및 모바일 티켓 구매시 사용 가능해요.</li>
          <li>등록된 리뷰는 자동으로 삭제되지 않아요. 탈퇴 전 개별적으로 삭제해 주세요.</li>
          <li>계정 정보 및 찜 목록 등 서비스 이용정보는 복구가 불가하며, 동일한 아이디로 24시간 이후 재가입이 가능해요.</li>
        </InfoText>
        <InfoCheck>
          <input type="checkbox" name="isAgree" ref={checkboxRef} onChange={checkWithdrawSet} />
          <span>위 주의사항을 모두 숙지했고, 탈퇴에 동의합니다</span>
        </InfoCheck>
        <CommonBorder background="#f2f2f2" margin="1rem 0 1rem 0" />
        <CommonForm onSubmit={submitWithdrawUser} style={{position:"relative"}}>
          <p style={{fontSize:"16px", marginBottom:"1rem"}}>비밀번호 입력</p>
          <CommonInput type="password" placeholder="비밀번호를 입력하세요." ref={passwordRef} background="#f5f5f5" border="none" fontSize="16px" placeholderSize="16px" activeBorder="none" margin="0 0 1rem 0" onChange={checkWithdrawSet} />
          <CommonBtn type="submit" background={btnState ? "#eb4242" : "#fafafa"} fontColor={btnState ? "#ffffff" : "#d2d2d2"} margin="8px 0 8px 0">진짜 안녕</CommonBtn>
          <AlertMessage opacity={popUp.opacity} visibility={popUp.visibility} top="25px" left="54px">{userState.error}</AlertMessage>
        </CommonForm>
        <CommonBtn type="button" fontColor="#37373f" background="#ffffff" border="1px solid #cccccc" margin="8px 0 8px 0" onClick={moveToMyPage}>돌아가기</CommonBtn>
      </InfoSpace>
    </WithdrawContainer>
  )
}

export default WithdrawForm;


const WithdrawContainer = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: "Pretendard-Regular";

  width: 370px;
  margin:0 auto;

  box-sizing: border-box;
`

const ReasonSpace = styled.div`
  width: 370px;
`

const ReasonTextArea = styled.textarea`
  background: #f8fafc;

  font-family: "Pretendard-Regular";

  display:flex;
  border:none;
  border-radius: 10px;
  outline: none;
  padding:1rem;
  margin-bottom: 3rem;

  width: 100%;
  height: 11vh;

  resize: none;

  box-sizing: border-box;

  &::placeholder {
    color:#9aa9ba;
    font-size:14px;
  }
`

const InfoMessage = styled.p`
  color: #707070;
  text-align:center;
  margin-bottom: 1rem;
`

const InfoSpace = styled.div`
  display: flex;
  flex-direction: column;

  margin:auto;
  margin-bottom: 3rem;
`

const InfoBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  font-size: 14px;
  font-weight: 100;
  color: #707070;

  border:none;
  border-radius: 5px;
  padding:1rem;
  margin:0.5rem 0;

  box-shadow: 0 0 10px 0 #ebebeb;
`

const InfoText = styled.div`
  font-size: 15px;
  font-weight: 100;
  color: #707070;


  & li {
    margin:1.2rem 0.5rem;
    
  }
`

const InfoCheck = styled.div`
  display: flex;
  flex-direction: row;
  gap:0.5rem;
  font-size:16px;

  margin: 1rem 0;
`