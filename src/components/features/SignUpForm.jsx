import { useEffect, useState } from "react";
import styled from "styled-components";
import { emailFormat, nicknameList1, nicknameList2, passwordFormat } from "../../utils/reqList";
import { CommonBtn, CommonInput, CommonRowBox, ErrorText, LogoBox, LogoImage, PopUpBackground, PopUpModal, PopUpMsg } from "../ui/styledSignUp";
import { useDispatch, useSelector } from "react-redux";
import { signUpFetch } from "../../app/module/userSlice";

function SignUpForm () {
  const [signUpData, setsignUpData] = useState({email: "", password: "", confirm:"", nickname: ""})
  const [checkState, setCheckState] = useState({email:"none", password:"none", confirm:"none"});
  const [btnState, setBtnState] = useState({background:"#fafafa", color: "#d4d4d4"});
  const [popUp, setPopUp] = useState(false);
  const dispatch = useDispatch();
  const signUpState = useSelector(state=> state.user);

  // popup error msg set
  useEffect(() => {
    if (signUpState.result === false || signUpState.result === true)
      setPopUp(true)
  },[signUpState])

  // closePopUp
  function closeToPopUp() {
    if (signUpState.result === false)
      setPopUp(false)
    else if (signUpState.result === true)
      window.location.assign("/login")
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
    if (checkState.email === "none" || checkState.password === "none" || checkState.confirm === "none");
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
        if (signUpData.confirm.length !== 0 && signUpData.password === signUpData.confirm)
          if (signUpData.nickname.length > 0)
            return true
    else
      return false
  }

  // create random Nickname
  function createRandomNickname() {
    const randomNickName = nicknameList1[Math.floor(Math.random()*nicknameList1.length)] + nicknameList2[Math.floor(Math.random()*nicknameList2.length)]
    setsignUpData({ ...signUpData, nickname:randomNickName })
  }

  //submit data for register db
  function confirmSignUpData (event) {
    event.preventDefault();
    if (checkSignUpData() === false)
      return
    
    dispatch(signUpFetch(signUpData));
  }

  // ????????? ?????? ?????? userSlice ????????? ?????? state ?????? ????????? ????????? ??????.

  return (
    <>
      {popUp === false ? <></> : 
      <PopUpBackground>
        <PopUpModal>
          <PopUpMsg>
            {signUpState.result === false ? signUpState.error : "????????? ?????????????????????! \n ??????????????? ?????? ???????????? ???????????????!"}
            </PopUpMsg>
          <CommonBtn type="button" onClick={closeToPopUp} background="#fb0552" fontColor="#ffffff" width="100%" padding="0 3rem" margin="0">??????</CommonBtn>
        </PopUpModal>
      </PopUpBackground>}
      <SignUpFormContainer>
        <LogoBox>
          <LogoImage src="https://image.goodchoice.kr/images/web_v3/ic_bi_yeogi_250px.png" alt="GoodChoice Inc. Logo" onClick={moveToMain}/>
        </LogoBox>
        <SignUpHeader>????????????</SignUpHeader>
        <SignUpFormBox>
          <SignUpLabel>????????? ?????????</SignUpLabel>
          <CommonInput name="email" type="email" border="1px solid #ececec" value={signUpData.email} onChange={inputSignUpData} />
          <ErrorText>{checkState.email === "none" ?
                        // first input data
                        "???" : signUpData.email.length === 0 ?
                            // length check
                            "????????? ????????? ??????????????????." : signUpData.email.match(emailFormat) ?
                                //email format check
                                "???" : "????????? ????????? ??????????????????."}</ErrorText>
          <SignUpLabel>????????????</SignUpLabel>
          <CommonInput name="password" type="password" border="1px solid #ececec" value={signUpData.password} onChange={inputSignUpData} />
          <ErrorText>{checkState.password === "none" ?
                        // first input data
                        "???" : signUpData.password.length === 0 ?
                            // length check
                            "??????????????? ??????????????????." : signUpData.password.length < 8 ?
                                // password min lenght check
                                "???????????? : ?????? 8??? ?????? ??????????????????." : signUpData.password.match(passwordFormat) ?
                                // password format check
                                    "???" : "???????????? : ??????,??????,???????????? ??? 2?????? ????????? ??????????????????."}</ErrorText>
          <SignUpLabel>???????????? ??????</SignUpLabel>
          <CommonInput name="confirm" type="password" border="1px solid #ececec" value={signUpData.confirm} onChange={inputSignUpData} />
          <ErrorText>{checkState.confirm === "none" ? 
                        // first input data
                        "???" : signUpData.confirm.length === 0 ? 
                            // length check
                            "??????????????? ?????? ??? ??????????????????." : signUpData.password === signUpData.confirm ?
                                // comparison password and confirm password 
                                "???" : "??????????????? ???????????? ????????????." }</ErrorText>
          <SignUpLabel>?????????</SignUpLabel>
          <CommonRowBox style={{gap:"0.5rem"}}>
            <CommonInput name="nickname" type="text" border="1px solid #ececec" width="269px" value={signUpData.nickname} onChange={inputSignUpData} />
            <CommonBtn type="button" background="ebebeb" fontColor="#666666" padding="0 1rem" onClick={createRandomNickname} fontSize="14px" height="48px" >???????????????</CommonBtn>
          </CommonRowBox>
          <CommonBtn type="submit" background={btnState.background} fontColor={btnState.color} margin="16px 0 8px 0" onClick={confirmSignUpData}>????????????</CommonBtn>
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
  margin:auto;
  margin-top:5rem;

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