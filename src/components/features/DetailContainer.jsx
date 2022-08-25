import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteDetailPageFetch, getDetailPageFetch } from "../../app/module/SearchSlice";
import { CommonBtn, CommonColumnBox, CommonRowBox, CommonText } from "../ui/styledSignUp";
import ReviewList from "./ReviewList";
import Parser from 'html-react-parser';
import { postReviewFetch } from "../../app/module/reviewSlice";
import { avgRating, avgRatingWord } from "../../utils/avgRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faBan } from "@fortawesome/free-solid-svg-icons";

function DetailContainer () {
  const [modalState, setModalState] = useState("booking");
  const [reviewData, setReviewData] = useState({comment: "", rating: ""})
  const [btnActive, setBtnActive] = useState(false);
  const userState = useSelector(state => state.user)
  const reviewState = useSelector(state => state.review)
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(()=> {
      dispatch(getDetailPageFetch(Number(id)));
  }, [reviewState])

  // get detail data
  const detailState = useSelector(state => state.search.data)
  
  // change button state when the cases are completed
  useEffect(() => {
    if (reviewData.rating !== "" && reviewData.comment !== "" && reviewData.comment.length !== 0)
      setBtnActive(true)
    else
    setBtnActive(false)
  },[reviewData])

  // chnage mode when user click to tap button
  function changeMode(event) {
    setModalState(event.target.id)
  }

  // input rating when user selected rating value
  function selectRatingValue(event) {
    setReviewData({...reviewData, rating: Number(event.target.value)})
  }

  // input content when user inputed textarea
  function inputReviewContent(event) {
    setReviewData({...reviewData, comment: event.target.value})
  }

  // submit reviewpost
  function submitReview(event) {
    event.preventDefault();
    dispatch(postReviewFetch({ ...reviewData, postId: Number(id)}))
  }
  
  // get ratingAverage and ratingTitle
  let ratingAverage, ratingTitle;
  if (Object.keys(detailState).length !== 0) {
    ratingAverage = avgRating(detailState.review)
    ratingTitle = avgRatingWord(ratingAverage)
  }

  // send to modify page
  function modifyContent() {
    window.location.assign(`/edit/${Number(id)}`)
  }

  //delete post data
  function deleteContent(){
    dispatch(deleteDetailPageFetch(Number(id)));
  }
  
  return (
      <DetailBox>
        {Object.keys(detailState).length !== 0 ?
        <>
          <DetailHeader>
            <ImageBox>
              <ThumbnailImage src={detailState.images} alt="Lodging Thumbnail Image" />
            </ImageBox>
            <CommonColumnBox>
              <SummaryTitle>{detailState.placename}</SummaryTitle>
              {ratingAverage >= 3 ?
              <CommonRowBox>
                <SummaryRating style={{color:"#ffffff", background:"#FFA726", borderRadius:"5px", padding:"0 0.2rem", marginRight:"0.3rem"}}>{ratingAverage.toFixed(1)}</SummaryRating>
                <SummaryRating color="#FFA726">{ratingTitle}</SummaryRating>
              </CommonRowBox> :<></>}
              <SummaryAddress>{detailState.location}</SummaryAddress>
              <CommonRowBox>
              {detailState.keyword.length !== 0 ? detailState.keyword.map((elem, idx) => elem === undefined ? <span key={idx} style={{color:"#1565c0", marginTop:"0.5rem", marginRight:"1rem"}}>#{elem}</span> : <></>) : <></> } 
              </CommonRowBox>
              <CommonColumnBox background="#fafafa" margin="3rem 2rem 0 0" padding="1.5rem">
                <CommonRowBox margin="0 0 1rem 0">
                  <CommonText color="#2d2727" fontFamily="Pretendard-Bold" fontSize="16px">사장님 한마디</CommonText>
                  <CommonText margin="0 0 0 auto" color="#23887c" fontSize="16px" style={{cursor:"pointer"}}>더보기</CommonText>
                </CommonRowBox>
                <CommonText style={{fontFamily:"Pretendard-ExtraLight", lineHeight:"1.2rem"}}>{detailState.message}</CommonText>
              </CommonColumnBox>
              {detailState.userId === userState.userId ?
                <CommonRowBox margin=" auto 3rem 0 0">
                  <FontAwesomeIcon icon={faPencil} style={fixIcon} onClick={modifyContent} />
                  <FontAwesomeIcon icon={faBan} style={deleteIcon} id={id} onClick={deleteContent}/>
                </CommonRowBox> : <></>}
            </CommonColumnBox>
          </DetailHeader>
          <DetailMenu>
            <BlankLine width="1rem" />
            <DetailMenuTap id="booking" fontFamily={modalState === "booking" ? "Pretendard-Bold" : "Pretendard-ExtraLight"} color={modalState === "booking"? "#fb0552" : "#9f9f9f"} border={modalState === "booking" ? "3px solid #fb0552" : "3px solid #ebebeb"} onClick={changeMode}>객실안내/예약</DetailMenuTap>
            <BlankLine width="1rem" />
            <DetailMenuTap id="information" fontFamily={modalState === "information" ? "Pretendard-Bold" : "Pretendard-ExtraLight"} color={modalState === "information"? "#fb0552" : "#9f9f9f"} border={modalState === "information" ? "3px solid #fb0552" : "3px solid #ebebeb"} onClick={changeMode}>숙소정보</DetailMenuTap>
            <BlankLine width="1rem" />
            <DetailMenuTap id="review" fontFamily={modalState === "review" ? "Pretendard-Bold" : "Pretendard-ExtraLight"} color={modalState === "review" ? "#fb0552" : "#9f9f9f"} border={modalState === "review" ? "3px solid #fb0552" : "3px solid #ebebeb"} onClick={changeMode}>리뷰</DetailMenuTap>
            <BlankLine width="76%" />
          </DetailMenu>
          <DetailBody>
            {modalState === "booking" ?
            <>
              <RoomBox>
                <ImageBox>
                  <ThumbnailImage src={detailState.roomimage[0]} alt="Lodging Thumbnail Image" width="400px" height="auto"/>
                </ImageBox>
                <CommonColumnBox margin="0" width="550px">
                  <CommonText fontFamily="Pretendard-Bold" fontSize="26px">{detailState.roomtitle[0]}</CommonText>
                  <CommonRowBox margin="4rem 0 0 0" style={{borderBottom:"1px solid #ebebeb"}}>
                    <CommonText fontFamily="Pretendard-Bold" margin="0 0 1rem 0">가격</CommonText>
                    <CommonText margin="0 0 0 auto">{detailState.roomcharge[0].toLocaleString("ko-KR")} 원</CommonText>
                  </CommonRowBox>
                  <CommonRowBox margin="2rem 0" style={{cursor:"pointer"}}>
                    <CommonText>객실 이용 안내</CommonText>
                    <ThumbnailImage style={{marginLeft:"auto"}} src="https://www.freeiconspng.com/thumbs/arrow-icon/right-arrow-icon-27.png" alt="Lodging Thumbnail Image" height="24px"/>
                  </CommonRowBox>
                  <CommonBtn background="#f0f0f0" color="#d4d4d4" style={{cursor:"default"}}>판매완료</CommonBtn>
                </CommonColumnBox>
              </RoomBox>
              <RoomBox>
                <ImageBox>
                  <ThumbnailImage src={detailState.roomimage[1]} alt="Lodging Thumbnail Image" width="400px" height="auto"/>
                </ImageBox>
                <CommonColumnBox margin="0" width="550px">
                  <CommonText fontFamily="Pretendard-Bold" fontSize="26px">{detailState.roomtitle[1]}</CommonText>
                  <CommonRowBox margin="4rem 0 0 0" style={{borderBottom:"1px solid #ebebeb"}}>
                    <CommonText fontFamily="Pretendard-Bold" margin="0 0 1rem 0">가격</CommonText>
                    <CommonText margin="0 0 0 auto">{detailState.roomcharge[1].toLocaleString("ko-KR")} 원</CommonText>
                  </CommonRowBox>
                  <CommonRowBox margin="2rem 0" style={{cursor:"pointer"}}>
                    <CommonText>객실 이용 안내</CommonText>
                    <ThumbnailImage style={{marginLeft:"auto"}} src="https://www.freeiconspng.com/thumbs/arrow-icon/right-arrow-icon-27.png" alt="Lodging Thumbnail Image" height="24px"/>
                  </CommonRowBox>
                  <CommonBtn background="#f0f0f0" color="#d4d4d4" style={{cursor:"default"}}>판매완료</CommonBtn>
                </CommonColumnBox>
              </RoomBox>
            </>
            : modalState === "information" ?
              <InfomationBox>
                <div>{Parser(detailState.content)}</div>
              </InfomationBox>
            :
              <RatingBox>
                <AverageBox style={{borderBottom:"1px solid #ebebeb"}}>
                  <CommonText fontSize="2rem">{ratingTitle}</CommonText>
                  <CommonRowBox justifyContent="center" alignItems="center" margin="2rem 0 3rem 0">
                    <div style={{position: "relative", fontSize: "3rem", color: "#cecece", marginRight:"0.5rem"}}>
                      ★★★★★
                      <StarRating style={{width: `${ratingAverage*20}%`, fontSize: "3rem", position: "absolute", left: "0", top:"0", color: "#FFA726", overflow: "hidden", pointerEvents: "none"}}>★★★★★</StarRating>
                    </div>
                    <CommonText fontSize="2rem">{ratingAverage.toFixed(1)}</CommonText>
                  </CommonRowBox>
                </AverageBox>
                <InputBox style={{marginTop:"1.5rem"}} onSubmit={submitReview}>
                  <CommonRowBox style={{gap:"2rem"}}>
                    <CommonColumnBox>
                      <CommonText fontSize="1.2rem" margin="0 0 1.8rem 0">{userState.nickname}</CommonText>
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
                    <CommonBtn type="submit" height="42px" padding="0 1rem" color={btnActive === false ? "#bdbdbd" : "#ffffff"} background={btnActive === false ? "#f0f0f0" : "#fb0552"}>리뷰 게시</CommonBtn>
                  </CommonRowBox>
                </InputBox>
                {detailState.review.length !== 0 ? detailState.review.map(elem => <ReviewList key={elem.reviewId} data={elem}/>) : <div>로딩중입니다.</div>}
              </RatingBox>
              }
          </DetailBody>
          </>
        : <div>로딩중입니다.</div>}
      </DetailBox>
  )
}

export default DetailContainer;


const DetailBox = styled.div`
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 1024px;
  margin:2.5rem auto;
  margin-top: 7rem;

  box-sizing: border-box;
`

const DetailHeader = styled.div`
  display:grid;
  grid-template-columns: 1fr 1fr;

  gap:2rem;

  margin-bottom: 3rem;
`

const ImageBox = styled.div`
  display: block;
  
  overflow: hidden;
`

const SummaryTitle = styled.h2`
  font-family: "Pretendard-Bold", sans-serif;
  font-size: 2rem;
  margin: 0;
`

const SummaryRating = styled.div`
  color:${props=>props.color || "#000000"};
  font-size: 1rem;
  
  margin: 0 0 0.5rem 0;
`

const SummaryAddress = styled.div`
  font-size: 1.2rem;
  color: #787a7c;

  margin-top: 0.5rem;
`

const ThumbnailImage = styled.img`
  height: ${props=>props.height || "360px"};
`



const DetailMenu = styled.div`
  display: flex;
  flex-direction: row;

  width:100%;
`

const BlankLine = styled.div`
  border-bottom:3px solid #ebebeb;

  width:${props=>props.width};
`


const DetailMenuTap = styled.button`
  background: none;

  display: block;

  color:${props=>props.color};
  font-family: ${props=>props.fontFamily};
  font-size: 18px;

  border: none;
  border-bottom: ${props=>props.border};
  outline: none;
  padding:0;
  padding-bottom: 1rem;
  margin:0;

  cursor:pointer;
`


const DetailBody = styled.div`
  margin-top: 3rem;
`

const RoomBox = styled.div`
  display: flex;
  flex-direction: row;
  gap:2rem;
  
  border: 1px solid #ebebeb;
  border-radius: 5px;
  padding:1.5rem;
  margin:auto;
  margin-bottom: 2rem;

  width: 1024px;
  
  box-sizing: border-box;
`

const InfomationBox = styled.div`
  background-color: #fcfcfc;

  display: flex;
  flex-direction: column;
  
  border: none;
  border-radius: 16px;
  padding:2.5rem 3.5rem;
  margin:auto;

  width: 1024px;
  
  box-sizing: border-box;
`

const RatingBox = styled.div`
  display: flex;
  flex-direction: column;

  border: none;
  border-radius: 5px;
  padding-bottom:1.5rem;
  margin:0;

  width: 1024px;

  box-sizing: border-box;
`

const AverageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin:auto;
  
  width: 100%;
`

const StarRating = styled.div`
  font-size:1.5rem;
  
`



const InputBox = styled.form`
  display:flex;
  margin-bottom: 2rem;
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