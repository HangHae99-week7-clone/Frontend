import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  StSelectCategory,
  StButtonGroup,
  StContentsBox,
  StImageBox,
  StKeywordDiv,
  StLeftBox,
  StNothingSearch,
  StRatingBox,
  StRightBox,
  StTextBox,
  StWrap,
} from "../components/ui/StyledSearch";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";
import Layout from "../layout/Layout";
import { avgRating, avgRatingWord } from "../utils/avgRating";
import { __getAllSearch, __getKeywordSearch } from "../app/module/SearchSlice";
import { selectCategory } from "../utils/selectList";
import Slider from "../utils/slider";

const Search = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.search.result); //검색 결과 Store
  const [resultState, setResultState] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [searchParams, _] = useSearchParams(); //쿼리스트링 값을 가져오기 위한 Hooks
  const keyword = searchParams.get("keyword"); //쿼리스트링 중 keyword라는 key의 value값을 변수에 저장

  const onCheckHandler = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setCheckedList([...checkedList, value]);
    } else {
      setCheckedList(checkedList.filter((i) => i !== value));
    }
  };

  const onFilterHandler = () => {
    setResultState(result);
    setResultState(resultState.filter((i) => checkedList.includes(i.category) === true));
  };

  //컴포넌트가 마운트 될 때마다 API를 요청한다.
  //assign을 통해 들어오는 컴포넌트 이므로 따로 deps를 추가하지는 않는다.
  useEffect(() => {
    if (keyword) {
      dispatch(__getKeywordSearch(keyword));
    } else {
      dispatch(__getAllSearch());
    }
    setResultState(result);
  }, [dispatch, keyword, result[0]?.postId]);

  return (
    <>
      <Header />

      <StKeywordDiv>'{keyword || "모든 숙소"}'</StKeywordDiv>

      <Layout>
        <StWrap>
          <StLeftBox>
            <div>
              <h2>날짜</h2>
            </div>
            <hr />
            <div>
              <h2>상세조건</h2>
              <StButtonGroup>
                <button onClick={() => window.location.reload()}>초기화</button>
                <button onClick={onFilterHandler}>적용</button>
              </StButtonGroup>
            </div>
            <div>
              <h3>숙소 유형</h3>
              <StSelectCategory>
                {selectCategory.map((item) => (
                  <label key={item}>
                    <input type="checkbox" value={item} onChange={onCheckHandler} />
                    <span>{item}</span>
                  </label>
                ))}
              </StSelectCategory>
            </div>
            <div>
              <h3>가격</h3>
              <Slider />
            </div>
          </StLeftBox>

          <StRightBox>
            {result.length ? (
              resultState.map((item) => (
                <StContentsBox key={item.postId} onClick={() => window.location.assign(`/detail/${item.postId}`)}>
                  <StImageBox>
                    <img src={item.images} alt={item.postId} />
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
