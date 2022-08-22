import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { StContentsBox, StImageBox, StKeywordDiv, StLeftBox, StNothingSearch, StRatingBox, StRightBox, StTextBox, StWrap } from "../components/ui/StyledSearch";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Layout from "../layout/Layout";
import { avgRating, avgRatingWord } from "../utils/avgRating";
import { __getKeywordSearch } from "../app/module/SearchSlice";

const Search = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.search.result); //검색 결과 Store
  const [searchParams, _] = useSearchParams(); //쿼리스트링 값을 가져오기 위한 Hooks
  const keyword = searchParams.get("keyword"); //쿼리스트링 중 keyword라는 key의 value값을 변수에 저장

  //컴포넌트가 마운트 될 때마다 API를 요청한다.
  //assign을 통해 들어오는 컴포넌트 이므로 따로 deps를 추가하지는 않는다.
  useEffect(() => {
    dispatch(__getKeywordSearch(keyword));
  }, []);

  return (
    <>
      <Header />

      <StKeywordDiv>'{keyword}'</StKeywordDiv>

      <Layout>
        <StWrap>
          <StLeftBox>
            <div>
              <h2>날짜</h2>
            </div>
            <hr />
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
            {result.length ? (
              result.map((item) => (
                <StContentsBox key={item.postId}>
                  <StImageBox>
                    <img src={item.image} alt={item.postId} />
                    <div>{item.category}</div>
                  </StImageBox>

                  <StTextBox>
                    <div>
                      <h2>{item.placename}</h2>
                      <StRatingBox>
                        <span>{avgRating(item.review).toFixed(1)}</span>
                        <span>
                          {avgRatingWord(avgRating(item.review))} ({item.review.length})
                        </span>
                      </StRatingBox>
                      <span>{item.location}</span>
                    </div>

                    <div>
                      <h2>{Math.min(...item.roomcharge).toLocaleString("ko-KR")} 원</h2>
                    </div>
                  </StTextBox>
                </StContentsBox>
              ))
            ) : (
              <StNothingSearch>
                <p>'{keyword}'에 대한 검색결과가 없습니다.</p>
                <p>다시 입력해주세요.</p>
              </StNothingSearch>
            )}
          </StRightBox>
        </StWrap>
      </Layout>

      <Footer />
    </>
  );
};

export default Search;
