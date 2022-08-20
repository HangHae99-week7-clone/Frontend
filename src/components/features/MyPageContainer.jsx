import { useState } from "react";
import Gravatar from "react-gravatar";
import styled from "styled-components"
import { CommonBorder, CommonBtn, CommonForm, CommonInput, CommonRowBox, CommonText } from "../ui/styledSignUp";
import { RED} from "../../utils/colorPalette";


function MyPageContainer() {
  const [mode, setMode] = useState("read");

  // logout user
  function logoutConfirm (event) {
    event.preventDefault();
    window.localstorage.removeItem('token');
    window.location.assign('/main');
  }

  // move page to withdraw site
  function withdrawConfirm (event) {
    window.location.assign('/withdraw')
  }

  // change mode when want to change nickname
  function changeMode() {
    if (mode === "read")
      setMode("Modify")
    else
      setMode("read")
  }

  function changeNickname(event) {
    
  }


  return(
    <PageContainer>
      <PageHeader>
        <PageHeaderText>내정보</PageHeaderText>
      </PageHeader>
      <PageBody>
        <PageNav>
          <PageUntitledList>
            <PageMenuList key={1}>포인트</PageMenuList>
            <PageMenuList key={2}>쿠폰함</PageMenuList>
            <PageMenuList key={3}>예약 내역</PageMenuList>
            <PageMenuList key={4} fontWeight="700" color="#fb0552">내 정보 관리</PageMenuList>
            <PageMenuList key={5}>알림</PageMenuList>
            <PageMenuList key={6}>여기어때 상품권 잔액 조회</PageMenuList>
          </PageUntitledList>
        </PageNav>

        <PageDetail>
          <PageName>내 정보 수정</PageName>
          <PageAvatar>
            <Gravatar style={{borderRadius:"50%"}} email="a-email@example.com" size={128} default="mp" />
          </PageAvatar>
          <ProfileEmail>developneoguri@gmail.com</ProfileEmail>
          {mode === "read" ?
          <>
            <CommonRowBox margin="2rem 0 0 0">
              <ProfileText>닉네임</ProfileText>
              <ProfileNickName>술취한너구리</ProfileNickName>
            </CommonRowBox>
            <CommonBtn type="button" fontColor="#37373f" background="#ffffff" border="1px solid #cccccc" height="42px" padding="0.5rem 4rem" margin="1rem auto 1rem 0" onClick={changeMode} >수정</CommonBtn>
          </>
          :
          <CommonForm>
            <CommonRowBox justifyContent="flex-start" alignItems="center" margin="1rem 0">
              <CommonInput margin="0 1rem 0 0 " width="20rem" height="42px" />
              <CommonBtn type="button" fontColor="#ffffff" background="#fb0552" height="42px" padding="0.5rem 1rem" margin="0 2rem 0 0" fontSize="16px">딴거할래요</CommonBtn>
            </CommonRowBox>
            <CommonRowBox>
              <CommonBtn type="button" fontColor="#ffffff" background="#fb0552" height="42px" padding="0.5rem 2rem" margin="1rem 2rem 1rem 0" fontSize="16px" onClick={changeNickname}>수정완료</CommonBtn>
              <CommonBtn type="button" fontColor="#37373f" background="#ffffff" border="1px solid #cccccc" height="42px" padding="0.5rem 2rem" margin="1rem 1rem 1rem 0" fontSize="16px" onClick={changeMode}>수정취소</CommonBtn>
            </CommonRowBox>
          </CommonForm>
          }
          <CommonBorder background="#f2f2f2" margin="1rem 0" width="45vw" />
          <CommonRowBox justifyContent="flex-start" alignItems="center">
            <CommonText color="#6f6f6f" margin="0 2rem 0 0">여기어때를 이용하고 싶지 않으신가요?</CommonText>
            <LogoutText onClick={logoutConfirm}>로그아웃</LogoutText>
            <WithdrawText onClick={withdrawConfirm}>회원탈퇴</WithdrawText>
          </CommonRowBox>
        </PageDetail>
      </PageBody>

    </PageContainer>
  )
}

export default MyPageContainer;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 100vw;
`

const PageHeader = styled.div`
  background: ${RED};

  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  align-items: flex-start;
  
  padding: 0 2rem;
  margin: auto;
  width: 100vw;
  height: 240px;
`

const PageHeaderText = styled.h1`

  display: flex;
  
  color: #ffffff;
  font-size:2.5rem;
  font-weight: 300;
  margin: 0 auto;
  margin-top:7rem;

  width: 1024px;
  height: 250px;
`




const PageBody = styled.div`
  display: flex;
  flex-direction: row;

  width:1024px;
  margin: auto;
`

const PageNav = styled.nav`
  display:flex;
  flex-direction: column;
  margin-right: 2rem;
  width:256px;
`

const PageUntitledList = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin: 2rem;
`

const PageMenuList = styled.div`
  font-size: 18px;
  font-weight: ${props => props.fontWeight || "300"};
  margin: 1.5rem 0;
  color: ${props=> props.color || "#6f6f6f"};
`




const PageDetail = styled.div`
  display: flex;
  flex-direction: column;
  width: 768px;
`

const PageName = styled.h3`
  font-size: 20px;
  margin: 3rem 0;
`

const PageAvatar = styled.div`
`




const ProfileEmail = styled.div`
  color: #afafaf;
  margin-top: 1rem;
`

const ProfileText = styled.span`
  font-size: 18px;
  margin-right: 4rem;
`

const ProfileNickName = styled.span`
  font-size: 18px;
  font-weight: 100;
  color:#979797;
`




const LogoutText = styled.span`
  text-decoration: underline;
  margin: 0 0.5rem;

  cursor: pointer;
`

const WithdrawText = styled.span`
  text-decoration: underline;
  margin: 0 0.5rem;

  cursor: pointer;
`