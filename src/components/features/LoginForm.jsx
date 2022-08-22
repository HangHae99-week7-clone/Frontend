import styled from "styled-components";
import { useEffect, useState } from "react";
import { CommonInput, CommonBtn, ErrorText, LogoBox, LogoImage, AlertMessage } from "../ui/styledSignUp";
import { emailFormat } from "../../utils/reqList";
import { useDispatch, useSelector } from "react-redux";
import { loginFetch } from "../../app/module/userSlice";

function LoginForm () {
  const [loginData, setLoginData] = useState({email: "", password: ""})
  const [checkState, setCheckState] = useState({email:"none", password:"none"});
  const [popUp1, setpopUp1] = useState({opacity: 0, visibility: "hidden"});
  const [popUp2, setpopUp2] = useState({opacity: 0, visibility: "hidden"});
  const dispatch = useDispatch();
  const loginState = useSelector(state=> state.user);

  // popup error msg set
  useEffect(() => {
    if (loginState.result === false) {
      setpopUp2({opacity: 1, visibility: "visible"})
      setTimeout(() => setpopUp2({opacity: 0, visibility: "hidden"}), 3000)
    } else if (loginState.result === true)
      window.location.assign('/')
  },[loginState])
  
  // input data change event
  function inputLoginData (event) {
    const { type, value } = event.target;
    setLoginData({ ...loginData, [type]:value })
    if (checkState.email === "none" || checkState.password === "none");
      setCheckState({...checkState, [type]:"block"})
  }

  // easter egg
  function serviceErrorAlert () {
    if (popUp1.opacity === 1)
      return;
    setpopUp1({opacity: 1, visibility: "visible"})
    setTimeout(() => setpopUp1({opacity: 0, visibility: "hidden"}), 1000)
  }
  
  // move to main page
  function moveToMain () {
    window.location.assign('/')
  }

  // move to signup page
  function moveToSignUp () {
    window.location.assign('/signup')
  }

  // submit and send login data for check user data
  function confirmLogin (event) {
    event.preventDefault();
    if (loginData.email.length === 0)
      return
    else if  (!loginData.email.match(emailFormat))
      return
    else if (loginData.password.length === 0)
      return

    dispatch(loginFetch(loginData));
  }

  return (
    <>
      <LoginFormContainer>
        <AlertMessage opacity={popUp1.opacity} visibility={popUp1.visibility} top="116px" left="64px">현재 서비스 점검중입니다.<br />다음에 다시 시도해주십시오.</AlertMessage>
        <AlertMessage opacity={popUp2.opacity} visibility={popUp2.visibility} top="340px" left="36px">{loginState.error}</AlertMessage>
        <LogoBox>
          <LogoImage src="https://image.goodchoice.kr/images/web_v3/ic_bi_yeogi_250px.png" alt="GoodChoice Inc. Logo" onClick={moveToMain}/>
        </LogoBox>
        <CommonBtn background="#fce51e" fontColor="#625754" onClick={serviceErrorAlert}>카카오톡으로 로그인</CommonBtn>
        <CommonBtn background="#1877f2" onClick={serviceErrorAlert}>Facebook으로 로그인</CommonBtn>      
        <CommonBtn background="#28d111" onClick={serviceErrorAlert}>네이버로 로그인</CommonBtn>
        <OrDivision>
          <OrLine />
          <OrText>또는</OrText>
        </OrDivision>
        <LoginFormBox onSubmit={confirmLogin}>
          {/* Email Input & Email Error box */}
          <CommonInput type="email" placeholder="이메일 주소" value={loginData.email} onChange={inputLoginData} activeBorder={loginData.email.match(emailFormat) ? "1px solid #757575" : "1px solid #fb0552"} />
          <ErrorText display={checkState.email}>{loginData.email.length === 0 ? "이메일 내용이 비어있습니다." : loginData.email.match(emailFormat) ? "" : "이메일 내용을 확인해주세요."}</ErrorText>
          {/* Password Input & Password Error box */}
          <CommonInput type="password" placeholder="비밀번호" value={loginData.password} onChange={inputLoginData} activeBorder={loginData.password.length === 0 ? "1px solid #757575" : "1px solid #fb0552"} />
          <ErrorText display={checkState.password}>{loginData.password.length === 0 ? "비밀번호를 입력해주십시오." : ""}</ErrorText> 
          {/* Submit button */}
          <CommonBtn tpye="submit" background="#fb0552" margin="8px 0 8px 0">로그인</CommonBtn>
        </LoginFormBox>
        {/* MoveToPage */}
        <SignUpBtn onClick={moveToSignUp}>회원가입</SignUpBtn>
      </LoginFormContainer>
    </>
  )
}

export default LoginForm;

const LoginFormContainer = styled.div`
  display:flex;
  flex-direction: column;
  position: relative;

  font-family: "Pretendard-Regular";

  width: 370px;
  height: 700px;
  margin:auto;

  box-sizing: border-box;
`

const OrDivision = styled.div`
  & {
    display:flex;
    justify-content: center;
    align-items: center;
    position:relative;
    color: #bdbdbd;
    
    height:56px;
    margin-bottom: 8px;
  }
`

const OrLine = styled.div`
  background: #bdbdbd;
  height:1px;
  width: 100%;
  position: absolute;
`

const OrText = styled.div`
  background-color: #ffffff;
  margin:auto;
  padding: 1rem;
  position: absolute;
`

const LoginFormBox = styled.form`
  display:flex;
  flex-direction: column;

`

const SignUpBtn = styled.button`
  background: none;

  font-family: "Pretendard-Regular";
  color:#272727;
  border:none;
  font-size:16px;
  margin: 16px 0;

  cursor: pointer;
`