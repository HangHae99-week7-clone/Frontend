import { useState } from "react";
import Gravatar from "react-gravatar";
import styled from "styled-components";
import { CommonBorder, CommonBtn, CommonColumnBox, CommonRowBox, CommonText } from "../ui/styledSignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faBan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";


function ReviewList () {
  const [mode, setMode] = useState("read");
  const [reviewData, setReviewData] = useState({comment: "", rating: ""})
  const [btnActive, setBtnActive] = useState(false);
  const dispatch = useDispatch();


  function changeMode () {
    if (mode === "read")
      setMode("modify");
    else if (mode === "modify")
      setMode("read");
  }

  function deleteReview () {
    dispatch();
  }


  function selectRatingValue(event) {
    setReviewData({...reviewData, rating: event.target.value})
  }

  function inputReviewContent(event) {
    setReviewData({...reviewData, comment: event.target.value})
  }

  return (
    <ReviewListContainer>
      <CommonBorder background="#bdbdbd" />
      {mode === "read" ? 
      <ReviewBlock>
        <Gravatar email="userstate@gmail.com" size={64} default="mp" style={{borderRadius:"50%", height:"64px"}} />
        <ReviewContent>
          <CommonRowBox>
            <ReviewTitle>여기만한 곳은 어디에도 없을 거예요.</ReviewTitle>
            <FontAwesomeIcon icon={faPencil} style={fixIcon} onClick={changeMode} />
            <FontAwesomeIcon icon={faBan} style={deleteIcon} onClick={deleteReview} />
          </CommonRowBox>
          <CommonRowBox margin="0 0 1rem 0 ">
            <ReviewRating></ReviewRating>
            <CommonText>9.0</CommonText>
          </CommonRowBox>
          <CommonText style={{fontFamily:"Pretendard-ExtraLight", color:"#bdbdbd", margin:"1rem 0 1rem 0", fontSize:"18px"}}>user nickname</CommonText>
          <CommonText style={{fontFamily:"Pretendard-ExtraLight", fontSize:"18px"}}>
            엄마 생신이라 보내드렸어요 <br />
            세분이서 같이 가셨는데 객실도 너무 깨끗하고 좋으셨다고하시네요 <br />
            나이가있으신지라 체크인하시는것도 걱정했는데 생각보다 수월하게 하셔서 너무 다행이에요<br />
            근처에 동대문이랑 먹을곳도 많고 교통편도 편리해서 다니시기에도 좋으셨다고해요<br />
            수영장도있어서 다녀오셨다는데 아무래도 젊은 사람들 위주다보니 기대하신만큼은 아니셨나봐요<br />
            그래도 아주 만족하셨다고하니 기뻤습니다</CommonText>
        </ReviewContent>
      </ReviewBlock>
      : 
      <InputBox style={{marginTop:"1.5rem"}} onSubmit>
        <CommonRowBox style={{gap:"2rem"}}>
          <CommonColumnBox>
            <CommonText fontSize="1.2rem" margin="0 0 1.8rem 0">술취한 너구리</CommonText>
            <CommonText fontSize="1rem"  margin="0 0 0.5rem 0">평점 (5점 만점)</CommonText>
            <RatingSelect onChange={selectRatingValue} value={reviewData.rating}>
              <option value="0">0점</option>
              <option value="0.5">0.5점</option> 
              <option value="1">1점</option>
              <option value="1.5">1.5점</option>
              <option value="2">2점</option> 
              <option value="2.5">2.5점</option>
              <option value="3">3점</option>
              <option value="3.5">3.5점</option> 
              <option value="4">4점</option>
              <option value="4.5">4.5점</option>
              <option value="5">5점</option> 
            </RatingSelect>
          </CommonColumnBox>
          <InputTextArea placeholder="리뷰 내용을 작성해주세요." onChange={inputReviewContent} value={reviewData.comment} />
          <CommonColumnBox>
            <CommonBtn type="submit" height="42px" padding="0 1rem" color={btnActive === false ? "#bdbdbd" : "#ffffff"} background={btnActive === false ? "#f0f0f0" : "#fb0552"}>리뷰 게시</CommonBtn>
            <CommonBtn type="button" height="42px" padding="0 1rem" color="#ffffff" background="#37373f" onClick={changeMode}>취소</CommonBtn>
          </CommonColumnBox>
        </CommonRowBox>
      </InputBox>}
    </ReviewListContainer>
  )
}

export default ReviewList;

const ReviewListContainer = styled.div`
  

`

const ReviewBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;

  margin: 2rem 1rem;
`

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`

const ReviewTitle = styled.h2`
  font-family: "Pretendard-Bold", sans-serif;
  font-size:1.2rem; 

`
const ReviewRating = styled.p`
  
`
const fixIcon ={
  marginLeft:"auto", 
  height:"24px", 
  cursor:"pointer"
}


const deleteIcon ={
  marginLeft:"1rem",
  height:"24px",
  cursor:"pointer"
}

const InputBox = styled.form`
  display:flex;
  margin-bottom: 2rem;
`

const RatingSelect = styled.select`
  font-family: "Pretendard-ExtraLight";

  border:1px solid #bdbdbd;
  border-radius: 3px;
  outline:none;

  & option {
    font-family: "Pretendard-ExtraLight";
  }

  &:after {
    padding-left: 1rem;
  }
`

const InputTextArea = styled.textarea`
  background: #f8fafc;

  font-size: 16px;

  border:none;
  border-radius: 5px;
  padding: 1rem;
  outline:none;

  resize: none;
  width: 750px;
  height:100px;
`