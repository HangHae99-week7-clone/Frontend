import React from "react";
import styled from "styled-components";
import { GRAY_9, WHITE } from "../../utils/colorPalette";

const HeaderSearchModal = () => {
  const recommendKeyword = ["오션뷰", "파티룸", "야외수영장", "애견동반", "제주"]; //추천 검색어 배열

  //추천 검색어에 뜬 검색어 클릭시 검색 화면으로 넘어가는 함수
  const onClickKeyword = (event) => {
    const { textContent } = event.target; //target의 텍스트를 가져온다
    window.location.assign(`/search?keyword=${textContent}`);
  };

  return (
    <>
      <StSearchModal>
        <h1>추천 검색어</h1>
        <ul>
          {recommendKeyword.map((value) => (
            <li onClick={onClickKeyword} key={value}>
              {value}
            </li>
          ))}
        </ul>
      </StSearchModal>
    </>
  );
};

export default HeaderSearchModal;

//검색 모달 박스
const StSearchModal = styled.div`
  position: absolute;
  top: 80px;
  left: 195px;
  width: 800px;
  padding: 25px;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_9};
  border-top: 0;
  border-radius: 0 0 5px 5px;
  font-size: 14px;
  z-index: 9999;

  //추천 검색어 제목
  h1 {
    font-family: "Pretendard-Bold";
  }

  //추천 검색어 리스트
  ul > li {
    cursor: pointer;
    margin-top: 12px;

    &:hover {
      text-decoration-line: underline;
    }
  }
`;
