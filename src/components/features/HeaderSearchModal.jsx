import React from "react";
import styled from "styled-components";
import { GRAY_9, WHITE } from "../../utils/colorPalette";

const HeaderSearchModal = () => {
  return (
    <StModal>
      <h1>추천 검색어</h1>
      <ul>
        <li>오션뷰</li>
        <li>파티룸</li>
        <li>야외수영장</li>
        <li>애견동반</li>
      </ul>
    </StModal>
  );
};

export default HeaderSearchModal;

const StModal = styled.div`
  position: fixed;
  top: 80px;
  left: 50%;
  width: 800px;
  padding: 25px;
  background-color: ${WHITE};
  transform: translate(-40%);
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
  }
`;
