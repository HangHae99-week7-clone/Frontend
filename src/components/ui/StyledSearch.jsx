import styled from "styled-components";
import { GRAY_10, GRAY_6, GRAY_7, GRAY_9, WHITE, YELLOW } from "../../utils/colorPalette";

const StKeywordDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  background-color: ${GRAY_9};
  margin-top: 80px;
  margin-bottom: 40px;
  font-size: 38px;
`;

const StWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  padding: 25px;
  width: 300px;
  height: 660px;
  border: 1px solid ${GRAY_7};
  border-radius: 5px;

  hr {
    border: 0;
    height: 1px;
    background-color: ${GRAY_7};
  }

  h2 {
    font-family: "Pretendard-Bold";
    font-size: 18px;
  }

  h3 {
    font-family: "Pretendard-Bold";
    color: ${GRAY_6};
  }
`;

const StRightBox = styled.div`
  width: 635px;
`;

const StContentsBox = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${GRAY_7};
  padding: 16px 0;
`;

const StImageBox = styled.div`
  position: relative;
  width: 160px;
  height: 200px;

  img {
    height: 100%;
    object-fit: cover;
  }

  //카테고리 뱃지
  div {
    position: absolute;
    background-color: #3e4c67;
    padding: 0 2px;
    height: 18px;
    line-height: 18px;
    color: ${GRAY_9};
    font-size: 14px;
    text-align: center;
    top: 8px;
    right: 8px;
  }
`;

const StTextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 15px;
  width: 460px;

  //숙소 이름, 가격
  h2 {
    font-family: "Pretendard-Bold";
    font-size: 22px;
  }

  //위치
  span {
    display: inline-block;
    margin-top: 8px;
    font-size: 18px;
  }

  //가격
  & > div:nth-child(2) {
    display: flex;
    justify-content: end;
  }
`;

//리뷰
const StRatingBox = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  //리뷰 평균 점수
  span:nth-child(1) {
    display: inline-block;
    background-color: ${YELLOW};
    border-radius: 5px;
    padding: 1px 3px;
    font-size: 15px;
    color: ${WHITE};
  }

  //리뷰 점수 문구, 리뷰 개수
  span:nth-child(2) {
    font-size: 18px;
    color: ${YELLOW};
  }
`;

//검색결과 없는 화면
const StNothingSearch = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 150px;
  align-items: center;

  p:nth-child(1) {
    font-family: "Pretendard-Bold";
    font-size: 20px;
    color: ${GRAY_10};
  }

  p:nth-child(2) {
    margin-top: 20px;
    font-size: 18px;
    color: ${GRAY_6};
  }
`;

export { StContentsBox, StImageBox, StKeywordDiv, StLeftBox, StNothingSearch, StRatingBox, StRightBox, StTextBox, StWrap };
