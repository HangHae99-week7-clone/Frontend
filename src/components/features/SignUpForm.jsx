import { useEffect, useState } from "react";
import styled from "styled-components";
import { emailFormat, nicknameList1, nicknameList2, passwordFormat } from "../../utils/reqList";
import { CommonBtn, CommonInput, CommonRowBox, ErrorText, LogoBox, LogoImage, PopUpBackground, PopUpModal, PopUpMsg } from "../ui/styledSignUp";
import { useDispatch, useSelector } from "react-redux";

function SignUpForm () {
  const [signUpData, setsignUpData] = useState({email: "", password: "", confirmPassword:"", nickname: ""})
  const [checkState, setCheckState] = useState({email:"none", password:"none", confirmPassword:"none"});
  const [btnState, setBtnState] = useState({background:"#fafafa", color: "#d4d4d4"});
  const [popUp, setPopUp] = useState(false);
  const dispatch = useDispatch();
  // const signUpState = useSelector(state=> state.sign);
  // 작성하면서 생각하니 signup/signin으로 많이들 표현함.
  // 받아올 데이터는 result와 msg로 처리하면 될 것 같다.

// useEffect(() => {
//   if (signUpState.result === false)
//     setPopUp(true)
// },[signUpState])

  function closeToPopUp() {
    setPopUp(false)
  }

  // button active check
  useEffect(()=>{
    if (checkSignUpData() === true)
      setBtnState({background:"#fb0552", color: "#ffffff"})
    else
      setBtnState({background:"#fafafa", color: "#d4d4d4"});
  }, [signUpData])

  // input data change event
  function inputSignUpData (event) {
    const { name, value } = event.target;
    setsignUpData({ ...signUpData, [name]:value })
    if (checkState.email === "none" || checkState.password === "none" || checkState.confirmPassword === "none");
      setCheckState({...checkState, [name]:"block"})
  }

  // move to page
  function moveToMain () {
    window.location.assign('/')
  }

  // check user sign up data before submit that
  function checkSignUpData () {
    if (signUpData.email.length !== 0 && emailFormat.test(signUpData.email))
      if (signUpData.password.length !== 0 && signUpData.password.length >= 8 && passwordFormat.test(signUpData.password))
        if (signUpData.confirmPassword.length !== 0 && signUpData.password === signUpData.confirmPassword)
          if (signUpData.nickname.length > 0)
            return true
    else
      return false
  }

  function createRandomNickname() {
    const randomNickName = nicknameList1[Math.floor(Math.random()*nicknameList1.length)] + nicknameList2[Math.floor(Math.random()*nicknameList2.length)]
    setsignUpData({ ...signUpData, nickname:randomNickName })
  }


  //submit data for register db
  function confirmSignUpData (event) {
    event.preventDefault();
    if (checkSignUpData() === false)
      return
    
    dispatch();
  }

  // 데이터 받은 뒤에 userSlice 통해서 받을 state 에러 로직만 만들면 된다.

  return (
    <>
      {/* {popUp === false ? <></> : 
      <PopUpBackground>
        <PopUpModal>
          <PopUpMsg>
            {signUpState.msg}
            </PopUpMsg>
          <CommonBtn type="button" onClick={closeToPopUp} background="#fb0552" fontColor="#ffffff" width="100%" padding="0 3rem" margin="0">확인</CommonBtn>
        </PopUpModal>
      </PopUpBackground>} */}
      <SignUpFormContainer>
        <LogoBox>
          <LogoImage src="https://image.goodchoice.kr/images/web_v3/ic_bi_yeogi_250px.png" alt="GoodChoice Inc. Logo" onClick={moveToMain}/>
        </LogoBox>
        <SignUpHeader>회원가입</SignUpHeader>
        <SignUpFormBox>
          <SignUpLabel>이메일 아이디</SignUpLabel>
          <CommonInput name="email" type="email" border="1px solid #ececec" value={signUpData.email} onChange={inputSignUpData} />
          <ErrorText>{checkState.email === "none" ?
                        // first input data
                        "　" : signUpData.email.length === 0 ?
                            // length check
                            "이메일 내용이 비어있습니다." : signUpData.email.match(emailFormat) ?
                                //email format check
                                "　" : "이메일 내용을 확인해주세요."}</ErrorText>
          <SignUpLabel>비밀번호</SignUpLabel>
          <CommonInput name="password" type="password" border="1px solid #ececec" value={signUpData.password} onChange={inputSignUpData} />
          <ErrorText>{checkState.password === "none" ?
                        // first input data
                        "　" : signUpData.password.length === 0 ?
                            // length check
                            "비밀번호를 입력해주세오." : signUpData.password.length < 8 ?
                                // password min lenght check
                                "사용불가 : 최소 8자 이상 입력해주세요." : signUpData.password.match(passwordFormat) ?
                                // password format check
                                    "　" : "사용불가 : 영문,숫자,특수문자 중 2가지 이상을 조합해주세요."}</ErrorText>
          <SignUpLabel>비밀번호 확인</SignUpLabel>
          <CommonInput name="confirmPassword" type="password" border="1px solid #ececec" value={signUpData.confirmPassword} onChange={inputSignUpData} />
          <ErrorText>{checkState.confirmPassword === "none" ? 
                        // first input data
                        "　" : signUpData.confirmPassword.length === 0 ? 
                            // length check
                            "비밀번호를 한번 더 입력해주세오." : signUpData.password === signUpData.confirmPassword ?
                                // comparison password and confirm password 
                                "　" : "비밀번호가 일치하지 않습니다." }</ErrorText>
          <SignUpLabel>닉네임</SignUpLabel>
          <CommonRowBox style={{gap:"0.5rem"}}>
            <CommonInput name="nickname" type="text" border="1px solid #ececec" width="269px" value={signUpData.nickname} onChange={inputSignUpData} />
            <CommonBtn type="button" background="ebebeb" fontColor="#666666" padding="0 1rem" onClick={createRandomNickname} fontSize="14px" height="48px" >딴거할래요</CommonBtn>
          </CommonRowBox>
          <CommonBtn type="submit" background={btnState.background} fontColor={btnState.color} margin="16px 0 8px 0" onClick={confirmSignUpData}>가입하기</CommonBtn>
        </SignUpFormBox>
      </SignUpFormContainer>
    </>
  )
}

export default SignUpForm;

const SignUpFormContainer = styled.div`
  display:flex;
  flex-direction: column;
  position: relative;

  font-family: "Pretendard-Regular";

  width: 370px;
  height: 500px;
  margin:15vh auto;

  box-sizing: border-box;
`

const SignUpHeader = styled.h1`
  display: flex;
  font-family: "Pretendard-Regular";
  font-size: 20px;
  margin: auto;
  margin-bottom: 2rem;
`

const SignUpFormBox = styled.form`
  display:flex;
  flex-direction: column;
`

const SignUpLabel = styled.label`
  text-align: left;
  font-family: "Pretendard-Regular";
  font-weight: 700;
  font-size: 18px;
  color:#6f6f6f;

  margin-bottom: 0.8rem;
`