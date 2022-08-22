import React from "react";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Layout from "../layout/Layout";
import { GRAY_7, GRAY_9 } from "../utils/colorPalette";

const Search = () => {
  return (
    <div>
      <Header />
      <StKeywordDiv>'오션뷰'</StKeywordDiv>
      <Layout>
        <StWrap>
          <StLeftBox>
            <div>
              <h2>날짜</h2>
            </div>
            <div>
              <h2>상세조건</h2>
            </div>
            <div>
              <h3>숙소 유형</h3>
            </div>
            <div>
              <h3>가격</h3>
            </div>
          </StLeftBox>
          <StRightBox>
            <StContentsBox>
              <StImageBox>
                <img src="https://image.goodchoice.kr/resize_490x348/affiliate/2020/07/28/5f1fc14156c03.png" />
                <div>호텔</div>
              </StImageBox>
              <StTextBox>
                <div>
                  <h2>디아크 리조트</h2>
                  <span>전남 여수시 돌산읍 평사리 산 318-103</span>
                </div>
                <div>
                  <p>516,200원</p>
                </div>
              </StTextBox>
            </StContentsBox>
          </StRightBox>
        </StWrap>
      </Layout>
      <Footer />
    </div>
  );
};

export default Search;

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
  width: 300px;
  height: 660px;
  padding: 20px;
  border: 1px solid ${GRAY_7};
  border-radius: 5px;

  div:nth-child(1) {
    padding-bottom: 30px;
    border-bottom: 1px solid ${GRAY_7};
  }

  div:nth-child(2),
  div:nth-child(3),
  div:nth-child(4) {
    padding-top: 30px;
  }

  h2 {
    font-size: 18px;
    font-weight: 700px;
  }
`;

const StRightBox = styled.div`
  width: 635px;
  height: 500px;
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

  div {
    position: absolute;
    background-color: #3e4c67;
    width: 30px;
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

  h2,
  p {
    font-size: 22px;
    font-weight: 700;
  }

  span {
    display: inline-block;
    margin-top: 10px;
    font-size: 18px;
  }

  div:nth-child(2) {
    display: flex;
    justify-content: end;
  }
`;
