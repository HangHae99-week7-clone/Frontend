import { useEffect, useState } from "react";
import Gravatar from "react-gravatar";
import styled from "styled-components";
import { CommonBorder, CommonBtn, CommonColumnBox, CommonRowBox, CommonText } from "../ui/styledSignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faBan, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviewFetch, putReviewFetch } from "../../app/module/reviewSlice";


function ReviewList ({data}) {
  const [mode, setMode] = useState("read");
  const [reviewData, setReviewData] = useState({comment: data.comment, rating: data.rating})
  const [btnActive, setBtnActive] = useState(false);
  const userState = useSelector(state => state.user)
  const dispatch = useDispatch();

  useEffect(() => {
    if (reviewData.rating !== "" && reviewData.comment !== "" && reviewData.comment.length !== 0)
      setBtnActive(true)
    else
    setBtnActive(false)
  },[reviewData])

  // change reply mode read or modify
  function changeMode () {
    if (mode === "read")
      setMode("modify");
    else if (mode === "modify")
      setMode("read");
  }

  // delete review
  function deleteReview (event) {
      dispatch(deleteReviewFetch(Number(data.reviewId)))
  }

// select and input rating value
  function selectRatingValue(event) {
    setReviewData({...reviewData, rating: event.target.value})
  }

  // input review data
  function inputReviewContent(event) {
    setReviewData({...reviewData, comment: event.target.value})
  }

  // modify review data
  function fixReviewData(event) {
    event.preventDefault();
    const sendData = {...reviewData, reviewId: Number(data.reviewId)}
    dispatch(putReviewFetch(sendData))
    setMode("read")
  }

  // change review title what has rating value
  function reviewTitle() {
    if (data.rating === 5)
      return "여기만한 곳은 어디에도 없을 거에요."
    else if (data.rating > 4.5 && data.rating < 5)
      return "전체적으로 만족스러웠어요."
    else if (data.rating > 3.5 && data.rating <= 4.5)
      return "여기라면 다음에 또 이용할 거에요."
    else if (data.rating > 2.5 && data.rating <= 3.5)
      return "기대 이상이네요."
    else if (data.rating > 1.5 && data.rating <= 2.5)
      return "조금 아쉬웠지만 이용할만해요."
    else if (data.rating >= 0 && data.rating <= 1.5)
      return "조금만 더 신경 써 주세요."
  }

  return (
    <ReviewListContainer>
      <CommonBorder background="#bdbdbd" />
      {mode === "read" ? 
      <ReviewBlock>
        <Gravatar email={userState.email} size={64} default="mp" style={{borderRadius:"50%", height:"64px"}} />
        <ReviewContent>
          <CommonRowBox>
            <ReviewTitle>{reviewTitle()}</ReviewTitle>
            {data.nickname === userState.nickname ? 
            <>
              <FontAwesomeIcon icon={faPencil} style={fixIcon} onClick={changeMode} />
              <FontAwesomeIcon icon={faBan} style={deleteIcon} id={data.reviewId} onClick={deleteReview} />
            </> : <></>}
            </CommonRowBox>
          <CommonRowBox margin="0.5rem 0 1rem 0 ">
            <ReviewRating style={{position: "relative", fontSize: "1.1rem", color: "#cecece", marginRight:"0.5rem"}}>
              ★★★★★
              <ReviewRating style={{width: `${data.rating*20}%`, position: "absolute", left: "0", top:"0", color: "#FFA726", overflow: "hidden", pointerEvents: "none", height:"16px"}}>★★★★★</ReviewRating>
            </ReviewRating>
            <CommonText>{data.rating}</CommonText>
          </CommonRowBox>
          <CommonText style={{fontFamily:"Pretendard-ExtraLight", color:"#bdbdbd", margin:"1rem 0 1rem 0", fontSize:"18px"}}>{data.nickname}</CommonText>
          <CommonText style={{fontFamily:"Pretendard-ExtraLight", fontSize:"18px"}}>{data.comment}</CommonText>
        </ReviewContent>
      </ReviewBlock>
      : 
      <InputBox style={{marginTop:"1.5rem"}} onSubmit={fixReviewData}>
        <CommonRowBox style={{gap:"2rem"}}>
          <CommonColumnBox>
            <CommonText fontSize="1.2rem" margin="0 0 1.8rem 0">{data.nickname}</CommonText>
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