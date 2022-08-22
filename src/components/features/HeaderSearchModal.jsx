import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { GRAY_9, WHITE } from "../../utils/colorPalette";

const HeaderSearchModal = () => {
  const dispatch = useDispatch();
  const onClickKeyword = (event) => {
    const { textContent } = event.target;
    dispatch();
  };

  const recommendKeyword = ["오션뷰", "파티룸", "야외수영장", "애견동반"];
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

  h1 {
    font-weight: 800;
  }

  ul > li {
    cursor: pointer;
    margin-top: 12px;

    &:hover {
      text-decoration-line: underline;
    }
  }
`;
